import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Logout() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert("Logout failed", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});