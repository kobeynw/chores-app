import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import { createChild } from '../api/child';
import { useAuth } from '../context/AuthContext';
import useActionCable from '../websocket/useActionCable';

export default function AddChildDisplay() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { token, user } = useAuth();

  const testAvatars = ["🐻", "🐶", "🐼", "🦊", "🐱"];

  const { connected } = useActionCable({
    parentId: user.id,
    onMessage: (message) => {
      console.log('📡 WebSocket message received:', message);
      if (message.event === 'child_created') {
        Alert.alert(`New child created: ${message.child.name}`);
        // TODO: Trigger a refetch of child profiles here
      }
    }
  });

  const handleAddNewChild = async () => {
    if (name.length > 0 && age > 0) {
      try {
        await createChild(newChild(), token);
        Alert.alert(`Successfully added ${name}`);
        setName("");
        setAge("");
      } catch (error) {
        console.error("Error creating child:", error);
        Alert.alert("Something went wrong while adding the child.");
      }
    } else {
      Alert.alert("Please enter a valid name and age.");
    }
  };

  const newChild = () => {
    return {
      "name": name,
      "age": parseInt(age),
      "avatar_url": testAvatars[Math.floor(Math.random() * testAvatars.length)]
    };
  }

  return (
    <FormContainer title="Add a new child">
      <FormInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        maxLength={25}
      />
      <FormInput
        placeholder="Age"
        value={age > 0 ? age : null}
        onChangeText={setAge}
        maxLength={2}
        keyboardType="number-pad"
      />
      <View style={{ alignItems: 'center' }}>
        <Pressable 
          style={pressableStyle}
          onPress={handleAddNewChild}
        >
          <Text style={styles.text}>Add Child</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 12, color: connected ? 'green' : 'red', textAlign: 'center' }}>
        WebSocket is {connected ? 'connected' : 'disconnected'}
      </Text>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 20, color: '#212121', textAlign: 'center' },
  button: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginVertical: 30,
    backgroundColor: '#FFCCFF',
  },
});

const pressableStyle = ({ pressed }) => [
  styles.button,
  { opacity: pressed ? 0.6 : 1, width: '70%' },
];