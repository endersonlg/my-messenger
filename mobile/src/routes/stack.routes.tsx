import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from '../@types/navigation';
import { HeaderMessage } from '../components/HeaderMessage';
import { Chat } from '../pages/Chat';
import { ListUsers } from '../pages/ListUsers';
import theme from '../style/theme';

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

export function StackRoutes() {
  return (
    <Navigator initialRouteName="ListUsers">
      <Screen
        name="ListUsers"
        component={ListUsers}
        options={() => ({
          title: 'Lista de usuários',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.gray1,
          headerTitleStyle: {
            fontWeight: '600',
          },
        })}
      />
      <Screen
        name="Message"
        component={Chat}
        options={({ route }) => ({
          title: route.params.nickname,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerLeft: HeaderMessage,
          headerTintColor: theme.colors.gray1,
          headerTitleStyle: {
            fontWeight: '600',
          },
        })}
      />
    </Navigator>
  );
}
