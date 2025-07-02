import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (err) {
      Alert.alert("Registration failed", err.message);
    }
  };

  return (
    <FormContainer title="Register">
      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </FormContainer>
  );
}
