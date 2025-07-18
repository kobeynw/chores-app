import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import EllipseShape from '../components/EllipseShape';

export default function ChildProfileViewer({ route }) {
  const { childProfile } = route.params;

  return (
    <View>
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
          <Text style={styles.text}>$ {childProfile.points}</Text>
        </View>
        <View name="xp-display" style={styles.columns}>
          <Text style={styles.text}>XP</Text>
          <Text style={styles.text}>{childProfile.xp}</Text>
        </View>
        <View name="level-display" style={styles.columns}>
          <Text style={styles.text}>Level</Text>
          <Text style={styles.text}>{childProfile.level}</Text>
        </View>
        <View name="age-display" style={styles.columns}>
          <Text style={styles.text}>Age</Text>
          <Text style={styles.text}>{childProfile.age}</Text>
        </View>
      </View>
    </View>
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
    paddingVertical: 20,
    borderTopWidth: 2,
  },
});
