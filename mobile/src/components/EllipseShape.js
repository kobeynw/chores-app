import React from 'react';
import { View } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

const EllipseShape = ({
  width = 220,
  height = 100,
  fill = 'rgba(0, 0, 0, 0.15)',
}) => {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.4;
  const ry = height * 0.33;

  return (
    <View>
      <Svg width={width} height={height}>
        <Ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default EllipseShape;
