import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      Alert.alert("Login failed", err.message);
    }
  };

  return (
    <FormContainer title="Sign In">
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
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Button
        title="Don't have an account? Register"
        onPress={() => navigation.navigate('Register')}
      />
    </FormContainer>
  );
}
