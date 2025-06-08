// mobile/src/components/FormContainer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormContainer({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    elevation: 2, // for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});
