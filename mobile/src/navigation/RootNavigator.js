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
        <AppStack headerStyle={headerStyle} />
      ) : (
        <AuthStack headerStyle={headerStyle} />
      )}
    </NavigationContainer>
  );
}

const headerStyle = { 
  title: 'My Chores App',
  headerStyle: {
    backgroundColor: '#4CAF50',
  },
  headerTintColor: '#212121',
  headerTitleStyle: {
    fontFamily: 'Chalkboard SE',
    fontSize: 20,
  }
};