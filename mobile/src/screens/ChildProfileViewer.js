import React, { useState } from 'react';
import {
  View, Text, Image, Button, Pressable, StyleSheet, TextInput, Keyboard,
  KeyboardAvoidingView, ScrollView, Platform, Alert
} from 'react-native';
import EllipseShape from '../components/EllipseShape';

export default function ChildProfileViewer({ route }) {
  const { childProfile } = route.params;
  const [points, setPoints] = useState(childProfile.points);
  const [xp, setXp] = useState(childProfile.xp);
  const [level, setLevel] = useState(childProfile.level);
  const [age, setAge] = useState(childProfile.age);

  const handleSaveChild = () => {
    // TODO: add logic to update child profile
    Alert.alert("Saving info...");
  }

  // TODO: add logic to auto-compute the level and XP

  // TODO: add logic to delete child profile

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.text}>{childProfile.name}</Text>
        </View>

        <View name="character-display" style={styles.characterContainer}>
          <EllipseShape
            width={200}
            height={80}
          />
          <Image 
            source={require('../../assets/ninja-mask.png')}
            style={styles.image}
            resizeMode='contain'
          />
        </View>

        <View style={styles.infoContainer}>
          <View name="points-display" style={styles.columns}>
            <Text style={styles.text}>Points</Text>
            <TextInput
              style={styles.input}
              value={points.toString()}
              onChangeText={(text) => {setPoints(parseInt(text) || 0)}}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              maxLength={10}
            />
          </View>
          <View name="xp-display" style={styles.columns}>
            <Text style={styles.text}>XP</Text>
            <TextInput
              style={styles.input}
              value={xp.toString()}
              onChangeText={(text) => {setXp(parseInt(text) || 0)}}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              maxLength={10}
            />
          </View>
          <View name="level-display" style={styles.columns}>
            <Text style={styles.text}>Level</Text>
            <TextInput
              style={styles.input}
              value={level.toString()}
              onChangeText={(text) => {setLevel(parseInt(text) || 0)}}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              maxLength={2}
            />
          </View>
          <View name="age-display" style={styles.columns}>
            <Text style={styles.text}>Age</Text>
            <TextInput
              style={styles.input}
              value={age.toString()}
              onChangeText={(text) => {setAge(parseInt(text) || 0)}}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              maxLength={2}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Pressable 
            style={pressableStyle}
            onPress={handleSaveChild}
          >
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <Button
            title="Delete Profile"
            onPress={() => {Alert.alert("Deleting Profile...")}}
            color="red"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 35 },
  text: { fontSize: 32, color: '#212121', textAlign: 'center' },
  characterContainer: {
    position: 'relative',
    height: 150,
    marginTop: 25,
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    bottom: 40,
    width: 130,
    height: 130,
  },
  infoContainer: {
    borderBottomWidth: 2,
  },
  columns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 2,
  },
  input: {
    fontSize: 30,
    height: 50,
    minWidth: 120,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    textAlign: 'right'
  },
  button: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 30,
    paddingVertical: 20,
    backgroundColor: '#FFCCFF',
  },
});

const pressableStyle = ({ pressed }) => [
  styles.button,
  { opacity: pressed ? 0.6 : 1, width: '70%' },
];