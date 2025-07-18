import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddChildDisplay() {
  return (
    <View>
      <Text style={styles.text}>Add a new child here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 20, color: '#212121', textAlign: 'center' },
});