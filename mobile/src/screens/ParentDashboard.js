import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Button, Alert } from 'react-native';
import ChildCard from '../components/ChildCard';
import CardContainer from '../components/CardContainer';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ParentDashboard() {
  const { childProfiles } = useAuth();
  const navigation = useNavigation();

  const childCards = childProfiles.map((childProfile) => (
    <ChildCard
      key={childProfile.id}
      childProfile={childProfile}
      handlePress={() => navigation.navigate('ChildProfileViewer', { childProfile })}
    />
  ));

  return (
    <View style={styles.scrollWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Button
            title="Premium"
            onPress={() => {Alert.alert("Opening Premium Screen...")}}
          />
          <Button
            title="Settings"
            onPress={() => {Alert.alert("Opening Settings...")}}
          />
        </View>

        <CardContainer title="My Children">
          {childProfiles.length > 0 && childCards}
          <Pressable 
            style={pressableStyle}
            onPress={() => navigation.navigate('AddChildDisplay')}
          >
            <Text style={styles.text}>Add Child</Text>
          </Pressable>
        </CardContainer>

        <CardContainer title="Chores">
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Calendar...")}}
          >
            <Text style={styles.text}>Calendar</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Stats Chart...")}}
          >
            <Text style={styles.text}>Stats Chart</Text>
          </Pressable>
        </CardContainer>

        <CardContainer title="Rewards">
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Rewards...")}}
          >
            <Text style={styles.text}>Rewards</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Archived Screen...")}}
          >
            <Text style={styles.text}>Archived</Text>
          </Pressable>
        </CardContainer>

        <View style={styles.footer}>
          <Button
            title="I Need Help"
            onPress={() => {Alert.alert("Opening Help Modal...")}}
          />
          <Button
            title="Give Feedback"
            onPress={() => {Alert.alert("Opening Feedback Screen...")}}
          />
        </View>
        <Text style={{ paddingBottom: 30 }}>Workman Software™</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    alignItems: 'center',
    paddingTop: 10,
  },
  scrollWrapper: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: { fontSize: 20, color: '#212121', textAlign: 'center' },
  button: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#FFCCFF',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
    alignItems: 'center',
    paddingTop: 150,
    paddingBottom: 20,
  },
});

const pressableStyle = ({ pressed }) => [
  styles.button,
  { opacity: pressed ? 0.6 : 1, width: '70%' },
];