import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import Logout from '../components/Logout';
import { useAuth } from '../context/AuthContext';
import ChildCard from '../components/ChildCard';
import PasscodeModal from '../components/PasscodeModal';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { childProfiles } = useAuth();
  const navigation = useNavigation();

  const childCards = childProfiles.map((childProfile) => (
    <ChildCard
      key={childProfile.id}
      childProfile={childProfile}
      handlePress={() => navigation.navigate('ChildDashboard', { childProfile })}
    />
  ));

  return (
    <>
      <Logout />
      
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to your chore manager!</Text>
        <Text style={styles.subheader}>Who is using the app?</Text>

        {childProfiles.length > 0 && (
          <View style={styles.scrollWrapper}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {childCards}
            </ScrollView>
          </View>
        )}

        <Button
          style={styles.footer}
          title="I'm a Parent"
          onPress={() => setModalVisible(true)}
        />

        <PasscodeModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    color: '#212121',
    marginBottom: 30,
  },
  subheader: {
    fontSize: 18,
    color: '#212121',
    marginBottom: 20,
  },
  scrollWrapper: {
    height: '60%',
    width: '90%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%',
  },
  footer: {
    fontSize: 18,
    color: '#212121',
    marginTop: 20,
  },
});
