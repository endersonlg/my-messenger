import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
`;

interface MessageProps {
  receiverMessage: boolean;
}

export const BoxMessage = styled.View<MessageProps>`
  position: relative;
  padding: 2px 12px;
  background-color: #f45b69;
  border-radius: 4px;
  margin: 16px 10px 0;
  align-self: flex-end;

  ${({ receiverMessage }) =>
    receiverMessage &&
    css`
      align-self: flex-start;
    `}
`;

export const BoxMessageViewAux = styled.View<MessageProps>`
  position: absolute;
  right: -10px;
  bottom: 0;
  width: 0;
  height: 0;

  border-left-width: 10px;
  border-left-color: transparent;
  border-right-width: 10px;
  border-right-color: transparent;
  border-bottom-width: 10px;
  border-bottom-color: #f45b69;
  border-radius: 1px;

  ${({ receiverMessage }) =>
    receiverMessage &&
    css`
      left: -10px;
      right: 0px;
    `}
`;

export const ContentInputMessage = styled.View`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  padding: 0 16px;
  height: 48px;
`;

export const TextMessage = styled.Text`
  color: #fafafa;
`;

export const TextInputMessage = styled.TextInput`
  flex: 1;

  padding: 8px 12px;
  border-radius: 8px;
  border-width: 2px;
  border-color: #0072bb;
  background-color: #ebebeb;
  color: #1b1b1e;
`;

export const TouchableOpacitySend = styled.TouchableOpacity`
  margin-left: 8px;
`;
