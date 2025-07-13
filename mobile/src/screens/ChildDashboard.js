import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChildDashboard({ route }) {
  const { childProfile } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {childProfile.name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    color: '#212121',
    marginBottom: 30,
  },
});