import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from "react-native";
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
