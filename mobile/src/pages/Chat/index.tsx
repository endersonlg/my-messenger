import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { VirtualizedList, StyleSheet, Platform, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useChat } from '../../contexts/ChatContext';
import { api } from '../../service/api';
import {
  BoxMessage,
  BoxMessageViewAux,
  Container,
  ContentInputMessage,
  TextInputMessage,
  TextMessage,
  TouchableOpacitySend,
} from './style';

interface Message {
  id: string;
  user_sender: string;
  user_receiver: string;
  text: string;
}

type ParamsProps = {
  id: string;
  name: string;
  image: string;
};

export function Chat() {
  const [oldMessages, setOldMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const route = useRoute();
  const refList = useRef<VirtualizedList<Message>>(null);

  const {
    allMessages,
    sendMessage,
    clearMessagesThisReceiver,
    clearNotificationThisUser,
  } = useChat();

  const idUserReceiver = useMemo(() => {
    const { id } = route.params as ParamsProps;
    return id;
  }, [route]);

  useEffect(() => {
    if (idUserReceiver && Platform.OS !== 'web') {
      clearNotificationThisUser(idUserReceiver);
    }
  }, [idUserReceiver, clearNotificationThisUser]);

  useEffect(() => {
    (async () => {
      if (idUserReceiver) {
        try {
          const { data } = await api.get<Message[]>(
            `/messages/${idUserReceiver}`,
          );
          setOldMessages(data);
        } catch (err) {
          // console.log(err);
        }
      }
    })();

    return () => clearMessagesThisReceiver(idUserReceiver);
  }, [idUserReceiver, route, clearMessagesThisReceiver]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Notifications.cancelScheduledNotificationAsync(idUserReceiver);
    }
  }, [idUserReceiver]);

  const messages = useMemo(() => {
    if (!idUserReceiver) {
      return [];
    }

    const messagesAux: Message[] = [];
    if (oldMessages.length) {
      messagesAux.push(...oldMessages);
    }

    const messagesThisReceiver = allMessages.filter(
      (message) =>
        message.user_receiver === idUserReceiver ||
        message.user_sender === idUserReceiver,
    );

    if (messagesThisReceiver.length) {
      messagesAux.push(...messagesThisReceiver);
    }

    return messagesAux;
  }, [allMessages, idUserReceiver, oldMessages]);

  const getItem = (_: any, index: number) => messages[index];

  const handleSendMessage = () => {
    const textMessage = text.trim();
    if (textMessage) {
      sendMessage(textMessage, idUserReceiver);
      setText('');
    }
  };

  useEffect(() => {
    if (messages.length) {
      refList.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  return (
    <Container>
      {messages.length ? (
        <VirtualizedList
          data={messages}
          getItem={getItem}
          // initialScrollIndex={messages.length - 1}
          ref={refList}
          getItemLayout={(_: any, index: number) => ({
            length: 39.5,
            offset: 39.5 * index,
            index,
          })}
          maxToRenderPerBatch={20}
          showsVerticalScrollIndicator={false}
          getItemCount={() => messages.length}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BoxMessage receiverMessage={item.user_sender === idUserReceiver}>
              <TextMessage>{item.text}</TextMessage>
              <BoxMessageViewAux
                receiverMessage={item.user_sender === idUserReceiver}
              />
            </BoxMessage>
          )}
          style={styles.contentMessages}
        />
      ) : (
        <View style={styles.contentMessages} />
      )}

      <ContentInputMessage>
        <TextInputMessage
          placeholder="Digite sua mensagem"
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <TouchableOpacitySend activeOpacity={0.8} onPress={handleSendMessage}>
          <MaterialCommunityIcons
            name="send-circle"
            size={48}
            color="#0072BB"
          />
        </TouchableOpacitySend>
      </ContentInputMessage>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentMessages: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
