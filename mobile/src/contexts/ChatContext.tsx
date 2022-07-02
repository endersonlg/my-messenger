import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { io } from 'socket.io-client';

import { useAuthentication } from './AuthenticationContext';
import { User } from './types';

type ChatProviderProps = {
  children: ReactNode;
};

interface Message {
  id: string;
  user_sender: string;
  user_receiver: string;
  text: string;
}

interface ReceivedMessageSocket extends Message {
  userSender?: User;
}

interface SendMessage {
  text: string;
  user_receiver: string;
}

interface ChatContext {
  allMessages: Message[];
  sendMessage: (text: string, idUserReceiver: string) => void;
  clearNotificationThisUser: (userId: string) => Promise<void>;
  clearMessagesThisReceiver: (idUserReceiver: string) => void;
}

const ChatContext = createContext({} as ChatContext);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function ChatProvider({ children }: ChatProviderProps) {
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const { user } = useAuthentication();

  const { token } = useAuthentication();

  const socket = useMemo(
    () =>
      io('http://192.168.25.10:3333', {
        reconnectionDelayMax: 10000,
        auth: {
          token,
        },
      }),
    [token],
  );

  useEffect(() => {
    if (socket) {
      socket.on('chat', (newMessage: ReceivedMessageSocket) => {
        setAllMessages((messagesAux) => [
          ...messagesAux,
          {
            id: newMessage.id,
            text: newMessage.text,
            user_receiver: newMessage.user_receiver,
            user_sender: newMessage.user_sender,
          },
        ]);

        if (
          Platform.OS !== 'web' &&
          newMessage.userSender &&
          user?.id !== newMessage.userSender.id
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: `Você tem uma mensagem de ${newMessage.userSender.nickname}`,
              body: newMessage.text,
            },
            trigger: { seconds: 1 },
            identifier: newMessage.userSender.id,
          });
        }
      });
    }
  }, [socket, user]);

  function sendMessage(text: string, idUserReceiver: string): void {
    socket.emit('send message', {
      user_receiver: idUserReceiver,
      text,
    } as SendMessage);
  }

  const clearMessagesThisReceiver = useCallback(
    (idUserReceiver: string): void => {
      setAllMessages((messagesState) => {
        const result = messagesState.filter(
          (messageState) =>
            messageState.user_receiver !== idUserReceiver &&
            messageState.user_sender !== idUserReceiver,
        );
        return result;
      });
    },
    [],
  );

  async function clearNotificationThisUser(userId: string) {
    await Notifications.dismissNotificationAsync(userId);
  }

  return (
    <ChatContext.Provider
      value={{
        allMessages,
        sendMessage,
        clearNotificationThisUser,
        clearMessagesThisReceiver,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const {
    allMessages,
    sendMessage,
    clearNotificationThisUser,
    clearMessagesThisReceiver,
  } = useContext(ChatContext);

  return {
    allMessages,
    sendMessage,
    clearNotificationThisUser,
    clearMessagesThisReceiver,
  };
}
