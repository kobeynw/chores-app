import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password, passcode);
    } catch (err) {
      Alert.alert("Registration failed", err.message);
    }
  };

  const passcodeInfo = () => {
    Alert.alert(
      "What's this?",
      "The parent passcode is a 4-digit code used to access parent-specific features"
    )
  }

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FormInput
          placeholder="Parent Passcode"
          value={passcode}
          onChangeText={setPasscode}
          maxLength={4}
          keyboardType="number-pad"
          secureTextEntry
          style={{ flex: 1 }}
        />
        <View style={{ marginHorizontal: '8%' }}>
          <Button
            title="ⓘ"
            onPress={passcodeInfo}
          />
        </View>
      </View>
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
