import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { XStack } from "tamagui";
import CodeCircle from "./CodeCircle";
import * as Haptics from "expo-haptics";

interface Props {
  buffer: string;
  isIncorrect: boolean;
}
const ShakeAnimation = ({ buffer, isIncorrect }: Props) => {
  const shakeAnimationValue = useRef(new Animated.Value(0)).current;

  const shakeAnimation = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

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
  if (buffer.length === 4 && !isIncorrect) shakeAnimation();

  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
      }}
    >
      <XStack space onPress={shakeAnimation}>
        <CodeCircle isIncorrect={isIncorrect} index={1} buffer={buffer} />
        <CodeCircle isIncorrect={isIncorrect} index={2} buffer={buffer} />
        <CodeCircle isIncorrect={isIncorrect} index={3} buffer={buffer} />
        <CodeCircle isIncorrect={isIncorrect} index={4} buffer={buffer} />
      </XStack>
    </Animated.View>
  );
};
export default ShakeAnimation;
