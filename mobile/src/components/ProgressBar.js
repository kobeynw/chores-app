import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({
  progress = 0.5,
  width = 200,
  height = 20,
  backgroundColor = '#e0e0e0',
  progressColor = 'red',
  borderRadius = 10,
}) => {
  const progressWidth = Math.max(0, Math.min(1, progress)) * width;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor,
          borderRadius,
        },
      ]}
    >
      <View
        style={{
          width: progressWidth,
          height,
          backgroundColor: progressColor,
          borderRadius,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default ProgressBar;
