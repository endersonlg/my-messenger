import styled, { css } from 'styled-components/native';

import { Button } from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 10%;
  background-color: #fafafa;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TouchableOpacityImage = styled.TouchableOpacity`
  margin-bottom: 24px;
  position: relative;
`;

export const TextSelectYourImage = styled.Text`
  position: absolute;
  top: 40px;
  color: #61616b;
  left: 2px;
  width: 124px;
  font-size: 24px;
  text-align: center;
`;

interface PhotoUser {
  havePhoto: boolean;
}

export const PhotoUser = styled.Image<PhotoUser>`
  width: 124px;
  height: 124px;
  border-radius: 8px;
  opacity: ${({ havePhoto }) => (havePhoto ? 1 : 0.6)};
`;

interface TextInputName {
  color: string;
}

export const TextInputName = styled.TextInput<TextInputName>`
  height: 36px;
  width: 100%;
  font-size: 16px;
  color: ${({ color }) => color};
  border: 0;
  padding-right: 16px;
  margin-left: 8px;
`;

interface ContentInputName {
  error: boolean;
}

export const ContentInputName = styled.View<ContentInputName>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #4e4e56;
  ${({ error }) =>
    error &&
    css`
      border-bottom-color: #ed1c24;
    `}
`;

export const ButtonLogin = styled(Button)`
  /* position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px; */
`;
