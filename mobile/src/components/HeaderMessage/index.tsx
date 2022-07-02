import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import theme from '../../style/theme';
import { Avatar } from '../Avatar';
import { Container, ContentAvatar } from './styles';

type ParamsProps = {
  id: string;
  nickname: string;
  image: string;
};

export function HeaderMessage() {
  const navigation = useNavigation();
  const route = useRoute();

  const { nickname, image } = route.params as ParamsProps;

  return (
    <Container>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="arrowleft" size={24} color={theme.colors.gray1} />
      </TouchableOpacity>
      <ContentAvatar>
        <Avatar name={nickname} uri={image} size={36} invertColor />
      </ContentAvatar>
    </Container>
  );
}
