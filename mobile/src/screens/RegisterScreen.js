import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';

export default function RegisterScreen({ onLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    Alert.alert('Registration Successful', `Welcome ${email}!`);
    onLogin();
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
