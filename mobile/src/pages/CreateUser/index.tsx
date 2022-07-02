import React, { useState } from 'react';

import { AxiosError } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import userWithoutImage from '../../../assets/user_without_image.jpg';
import { AxiosErrorData } from '../../@types/axiosErrorData';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { User } from '../../contexts/types';
import { api } from '../../service/api';
import theme from '../../style/theme';
import {
  ButtonLogin,
  Container,
  Content,
  ContentInputName,
  PhotoUser,
  TextInputName,
  TextSelectYourImage,
  TouchableOpacityImage,
} from './styles';

interface ResponseCreateUser {
  user: User;
  token: string;
}

export function CreateUser() {
  const [nickname, setNickname] = useState<string>();
  const [imageUser, setImageUser] = useState<ImagePicker.ImageInfo>();
  const [error, setError] = useState(false);

  const { saveAuthentication } = useAuthentication();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImageUser(result);
    }
  };

  async function handleCreateUser(): Promise<void> {
    if (!nickname) {
      setError(true);
      ToastAndroid.showWithGravityAndOffset(
        'nickname is required',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    if (nickname.length < 3) {
      setError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Nick deve conter no mínimo 3 caracteres',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }

    api
      .post<ResponseCreateUser>('/users', {
        nickname,
        image: imageUser && `data:image/jpeg;base64,${imageUser?.base64}`,
      })
      .then(async ({ data }) => {
        await saveAuthentication(data);
      })
      .catch(({ response }: AxiosError<AxiosErrorData>) => {
        setError(true);

        if (response?.data.error) {
          ToastAndroid.showWithGravityAndOffset(
            response?.data.error,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      });
  }

  return (
    <Container>
      <Content>
        <TouchableOpacityImage activeOpacity={0.8} onPress={pickImage}>
          <PhotoUser
            source={imageUser ? { uri: imageUser.uri } : userWithoutImage}
            havePhoto={!!imageUser}
          />
          {!imageUser ? (
            <TextSelectYourImage>Select your photo</TextSelectYourImage>
          ) : null}
        </TouchableOpacityImage>

        <ContentInputName error={error}>
          <AntDesign
            name="user"
            size={24}
            color={!error ? theme.colors.gray6 : theme.colors.red}
          />
          <TextInputName
            placeholder="Enter your nickname"
            onChangeText={(value) => setNickname(value)}
            value={nickname}
            placeholderTextColor={
              !error ? theme.colors.gray6 : theme.colors.red
            }
            color={!error ? theme.colors.gray8 : theme.colors.red}
            onTouchStart={() => setError(false)}
          />
        </ContentInputName>
      </Content>
      <ButtonLogin text="Login" onPress={() => handleCreateUser()} />
    </Container>
  );
}
