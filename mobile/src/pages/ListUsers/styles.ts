import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
`;

export const ContentUser = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 10%;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

export const TextNameUser = styled.Text`
  margin-left: 16px;
  font-size: 16px;
  color: #303036;
`;

export const ContainerWithoutUsers = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextWithoutUsers = styled.Text`
  color: #ed1c24;
  font-size: 14px;

  margin-bottom: 48px;
`;
