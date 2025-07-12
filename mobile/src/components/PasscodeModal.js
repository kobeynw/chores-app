import { View, Text, StyleSheet, Button, Modal, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { verifyPasscode } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function PasscodeModal({ modalVisible, setModalVisible }) {
  const navigation = useNavigation();
  const [passcode, setPasscode] = useState('');
  const { token } = useAuth();

  const handleAccessDashboard = async () => {
    const isVerified = await verifyPasscode(passcode, token);
    if (isVerified) {
      setModalVisible(false);
      setPasscode('');
      navigation.navigate('ParentDashboard');
    } else {
      Alert.alert('Incorrect Passcode', 'Please try again.');
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Enter Passcode:</Text>

            <TextInput
              secureTextEntry
              keyboardType="number-pad"
              maxLength={4}
              value={passcode}
              onChangeText={setPasscode}
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleAccessDashboard} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: '25%'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    fontSize: 28,
    width: 120,
    textAlign: 'center',
    marginBottom: 30,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
});