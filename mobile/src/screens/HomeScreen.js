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

  const footerPadding = 310 - childProfiles.length * 45;

  const NoChildrenNotice = () => {
    return (
      <View>
        <Text style={styles.notice}>
          Added child profiles will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.scrollWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logout />
        
        <View style={styles.container}>
          <Text style={styles.header}>Welcome to your chore manager!</Text>
          <Text style={styles.subheader}>Who is using the app?</Text>

          {childProfiles.length > 0 ? childCards : <NoChildrenNotice />}

          <View style={{ marginTop: 40 }}>
          <Button
            title="I'm a Parent"
            onPress={() => setModalVisible(true)}
          />
          </View>

          <Text style={{ paddingTop: footerPadding >= 70 ? footerPadding : 70, paddingBottom: 30 }}>Workman Software™</Text>
        </View>

        <PasscodeModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView>
    </View>
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
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 10,
    width: '100%',
  },
  notice: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    marginVertical: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#f8f8f8',
    width: '100%',
  }
});
