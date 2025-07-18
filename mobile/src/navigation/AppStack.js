import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ParentDashboard from '../screens/ParentDashboard';
import ChildDashboard from '../screens/ChildDashboard';
import ChildProfileViewer from '../screens/ChildProfileViewer';
import AddChildDisplay from '../screens/AddChildDisplay';

const Stack = createNativeStackNavigator();

export default function AppStack({ headerStyle }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerStyle}
      />

      {/* ======== PARENT SCREENS ======== */}
      <Stack.Screen
        name="ParentDashboard"
        component={ParentDashboard}
        options={headerStyle}
      />
      <Stack.Screen 
        name="ChildProfileViewer"
        component={ChildProfileViewer}
        options={headerStyle}
      />
      <Stack.Screen
        name="AddChildDisplay"
        component={AddChildDisplay}
        options={headerStyle}
      />

      {/* ======== CHILD SCREENS ======== */}
      <Stack.Screen
        name="ChildDashboard"
        component={ChildDashboard}
        options={headerStyle}
      />
    </Stack.Navigator>
  );
}
