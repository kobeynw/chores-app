import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function FormInput({ value, onChangeText, placeholder, secureTextEntry = false }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
});
