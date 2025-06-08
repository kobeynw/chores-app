import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';

export default function LoginScreen({ onLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert('Login Successful', `Welcome ${email}!`);
    onLogin();
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
