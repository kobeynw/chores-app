import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChildCard({ childProfile }) {
  const navigation = useNavigation();

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      onPress={() => navigation.navigate('ChildDashboard')}
    >
      <Text style={styles.text}>{childProfile.avatar_url}  {childProfile.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#79BEEE'
  },
  text: { fontSize: 20, color: '#212121' },
});
