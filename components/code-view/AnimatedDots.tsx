import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { XStack } from "tamagui";
import CodeCircle from "./CodeCircle";

interface Props {
  buffer: string;
  isCorrect: boolean;
}
const ShakeAnimation = ({ buffer, isCorrect }: Props) => {
  const shakeAnimationValue = useRef(new Animated.Value(0)).current;

  const shakeAnimation = () => {
    shakeAnimationValue.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimationValue, {
        toValue: 10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: -10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: -10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 10,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const translateX = shakeAnimationValue.interpolate({
    inputRange: [-10, 10],
    outputRange: [-5, 5],
  });
  if (buffer.length === 4 && !isCorrect) shakeAnimation();

  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
      }}
    >
      <XStack space onPress={shakeAnimation}>
        <CodeCircle isCorrect={isCorrect} index={1} buffer={buffer} />
        <CodeCircle isCorrect={isCorrect} index={2} buffer={buffer} />
        <CodeCircle isCorrect={isCorrect} index={3} buffer={buffer} />
        <CodeCircle isCorrect={isCorrect} index={4} buffer={buffer} />
      </XStack>
    </Animated.View>
  );
};
export default ShakeAnimation;
