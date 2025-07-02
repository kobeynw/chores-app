import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ParentDashboard from '../screens/ParentDashboard';
import ChildDashboard from '../screens/ChildDashboard';

const Stack = createNativeStackNavigator();

export default function AppStack({ headerStyle }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerStyle}
      />
      <Stack.Screen
        name="ParentDashboard"
        component={ParentDashboard}
        options={headerStyle}
      />
      <Stack.Screen
        name="ChildDashboard"
        component={ChildDashboard}
        options={headerStyle}
      />
    </Stack.Navigator>
  );
}
