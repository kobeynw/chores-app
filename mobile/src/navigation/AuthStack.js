import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack({ headerStyle }) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login"
        options={headerStyle}
      >
        {props => <LoginScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        options={headerStyle}
      >
        {props => <RegisterScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
