import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logout from '../components/Logout';

export default function HomeScreen() {
  return (
    <>
      <Logout />
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to your chore app!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});
