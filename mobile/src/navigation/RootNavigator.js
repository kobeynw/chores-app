import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack />
      ) : (
        <AuthStack onLogin={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}
