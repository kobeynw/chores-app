import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChildDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Child Dashboard</Text>
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