import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import EllipseShape from '../components/EllipseShape';
import ProgressBar from '../components/ProgressBar';
import CardContainer from '../components/CardContainer';

export default function ChildDashboard({ route }) {
  const { childProfile } = route.params;

  return (
    <View style={styles.scrollWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Button
            title="I Need Help"
            onPress={() => {Alert.alert("Opening Help Modal...")}}
          />
          <Button
            title="Settings"
            onPress={() => {Alert.alert("Opening Settings...")}}
          />
        </View>

        <Text style={styles.text}>Hi, {childProfile.name}!</Text>

        <View name="character-display" style={styles.characterContainer}>
          <EllipseShape
            width={300}
            height={110}
          />
          <Image 
            source={require('../../assets/ninja-mask.png')}
            style={styles.image}
            resizeMode='contain'
          />
        </View>

        <CardContainer title="Level 16">
          <View name="points-display" style={styles.columns}>
            <Text style={styles.text}>Points</Text>
            <Text style={styles.text}>$ 12,000</Text>
          </View>
          <View name="XP-display" style={styles.columns}>
            <Text style={styles.text}>XP</Text>
            <Text style={styles.text}>1,300/2,000</Text>
          </View>
          <ProgressBar progress={1300/2000} width={270} height={16} />
        </CardContainer>

        <CardContainer title="Chores">
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Checking off item...")}}
          >
            <Text style={styles.text}>Take out the trash</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Checking off item...")}}
          >
            <Text style={styles.text}>Clean bedroom</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Checking off item...")}}
          >
            <Text style={styles.text}>Feed the dog</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Checking off item...")}}
          >
            <Text style={styles.text}>Finish social studies project</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Calendar...")}}
          >
            <Text style={styles.text}>Calendar</Text>
          </Pressable>
        </CardContainer>

        <CardContainer title="Rewards">
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Points Store...")}}
          >
            <Text style={styles.text}>Points Store</Text>
          </Pressable>
          <Pressable 
            style={pressableStyle}
            onPress={() => {Alert.alert("Opening Character Store...")}}
          >
            <Text style={styles.text}>Character Store</Text>
          </Pressable>
        </CardContainer>

        <Text style={{ paddingTop: 150, paddingBottom: 30 }}>Workman Software™</Text>
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
    paddingBottom: 40,
  },
  columns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    alignItems: 'center',
    paddingVertical: 20,
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
  characterContainer: {
    position: 'relative',
    height: 230,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFCCFF',
  },
  image: {
    position: 'absolute',
    bottom: 45,
    width: 180,
    height: 180,
  }
});

const pressableStyle = ({ pressed }) => [
  styles.button,
  { opacity: pressed ? 0.6 : 1, width: '70%' },
];