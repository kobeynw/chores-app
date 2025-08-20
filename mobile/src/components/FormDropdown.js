import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

export default function FormDropdown({
  value,
  onValueChange,
  items,
  placeholder = 'Select an option...',
  width = null,
  style,
}) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (itemValue) => {
    onValueChange(itemValue);
    setVisible(false);
  };

  return (
    <>
      <Pressable
        style={[styles.input, width ? { width } : null, style]}
        onPress={() => setVisible(true)}
      >
        <Text style={value ? styles.text : styles.placeholder}>
          {value || placeholder}
        </Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
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
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
  placeholder: {
    color: '#C7C7CD',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    width: '80%',
    maxHeight: 300,
  },
  option: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
