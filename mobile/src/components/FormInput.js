import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  maxLength = 30,
  width = null,
  keyboardType = null,
  style,
}) {
  return (
    <TextInput
      style={[styles.input, width ? { width } : null, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      maxLength={maxLength}
      keyboardType={keyboardType}
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
