import React, { useEffect, memo } from "react";
import { Pressable } from "react-native";
import { Text, HStack, Box } from 'native-base';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from "react-native-reanimated";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel = memo((props) => {
  const { strikethrough, textColor, inactiveTextColor, onPress, quantity, children } = props;

  const hstackOffset = useSharedValue(0)
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value }]
    }),
    [strikethrough]
  )
  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  )
  const strikethroughWidth = useSharedValue(0)
  const strikethroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikethroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikethrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      )
      strikethroughWidth.value = withTiming(1, { duration: 400, easing })
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      )
    } else {
      strikethroughWidth.value = withTiming(0, { duration: 400, easing })
      textColorProgress.value = withTiming(0, { duration: 400, easing })
    }
  })

  return (
    <Pressable onPress={onPress}>
      <HStack w={quantity ? 180 : 280}>
        <AnimatedHStack alignItems={"center"} style={[hstackAnimatedStyles]}>
          <AnimatedText fontSize={19} numberOfLines={1} isTruncated px={1} style={[textColorAnimatedStyles]}>
            {children}
          </AnimatedText>
          <AnimatedBox position={"absolute"} h={1} borderBottomWidth={4} style={[strikethroughAnimatedStyles]} />
        </AnimatedHStack>
      </HStack>
    </Pressable>
  );
})

export default AnimatedTaskLabel;