import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from 'react-native';

export default function FormMultiSelectDropdown({
  values = [],
  onValuesChange,
  items,
  placeholder = 'Select options...',
  width = null,
  style,
}) {
  const [visible, setVisible] = useState(false);
  const [tempSelected, setTempSelected] = useState(values);

  const toggleSelect = (itemValue) => {
    if (tempSelected.includes(itemValue)) {
      setTempSelected(tempSelected.filter((v) => v !== itemValue));
    } else {
      setTempSelected([...tempSelected, itemValue]);
    }
  };

  const handleDone = () => {
    onValuesChange(tempSelected);
    setVisible(false);
  };

  return (
    <>
      <Pressable
        style={[styles.input, width ? { width } : null, style]}
        onPress={() => {
          setTempSelected(values);
          setVisible(true);
        }}
      >
        <Text style={values.length ? styles.text : styles.placeholder}>
          {values.length
            ? items
                .filter((i) => values.includes(i.value))
                .map((i) => i.label)
                .join(', ')
            : placeholder}
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
              renderItem={({ item }) => {
                const isSelected = tempSelected.includes(item.value);
                return (
                  <Pressable
                    style={[
                      styles.option,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => toggleSelect(item.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
            />
            <Button title="Done" onPress={handleDone} />
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
    color: '#888',
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
  optionSelected: {
    backgroundColor: '#e0f0ff',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
