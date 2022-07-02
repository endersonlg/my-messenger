import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import {
  RefreshControl,
  TouchableOpacity,
  VirtualizedList,
  Button,
} from 'react-native';

import { Avatar } from '../../components/Avatar';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { api } from '../../service/api';
import theme from '../../style/theme';
import {
  Container,
  ContainerWithoutUsers,
  ContentUser,
  TextNameUser,
  TextWithoutUsers,
} from './styles';

interface User {
  id: string;
  nickname: string;
  image: string;
}

export function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const { invalidateAuthentication } = useAuthentication();

  const loadUsers = useCallback(async () => {
    setIsLoading(true);

    await api
      .get<User[]>('/other-users')
      .then(({ data }) => setUsers(data))
      .catch((e: AxiosError) => {
        if (e.response?.status === 401) {
          invalidateAuthentication();
        }
      });

    setIsLoading(false);
  }, [invalidateAuthentication]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const getItem = (_: any, index: number): User => users[index];

  return (
    <Container>
      {users.length ? (
        <VirtualizedList
          data={users ?? []}
          initialNumToRender={10}
          getItem={getItem}
          keyExtractor={(user) => user.id}
          getItemCount={(data) => data.length}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={isLoading}
              onRefresh={() => {
                loadUsers();
              }}
            />
          }
          renderItem={({ item: user }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Message', {
                  id: user.id,
                  image: user.image,
                  nickname: user.nickname,
                })
              }
            >
              <ContentUser>
                <Avatar size={50} uri={user.image} name={user.nickname} />
                <TextNameUser>{user.nickname}</TextNameUser>
              </ContentUser>
            </TouchableOpacity>
          )}
        />
      ) : (
        !isLoading && (
          <ContainerWithoutUsers>
            <TextWithoutUsers>
              Ainda não possuímos outros usuários :(
            </TextWithoutUsers>
            <Button
              title="CLiquei aqui para Atualizar"
              color={theme.colors.primary}
              onPress={() => loadUsers()}
            />
          </ContainerWithoutUsers>
        )
      )}
    </Container>
  );
}
