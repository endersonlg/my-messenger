import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from '../@types/navigation';
import { CreateUser } from '../pages/CreateUser';

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

export function StackAuthenticatedRoutes() {
  return (
    <Navigator initialRouteName="CreateUser">
      <Screen
        name="CreateUser"
        component={CreateUser}
        options={() => ({
          headerShown: false,
        })}
      />
    </Navigator>
  );
}
