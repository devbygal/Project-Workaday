import React, { useRef, useState } from 'react';
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedStroke = ({ progress, ...pathProps }) => {
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: Math.max(
      0,
      length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value) - 0.1
    )
  }))

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      onLayout={() => setLength(ref.current.getTotalLength())}
      ref={ref}
      strokeDasharray={length}
      {...pathProps}
    />
  )
}

export default AnimatedStroke;