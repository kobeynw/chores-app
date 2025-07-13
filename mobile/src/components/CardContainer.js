import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardContainer({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 24,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});
