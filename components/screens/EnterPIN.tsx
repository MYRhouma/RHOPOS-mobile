import React, { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, Vibration, Platform } from "react-native";
import { Delete, XSquare } from "@tamagui/lucide-icons";
import {
  H3,
  Spacer,
  TamaguiProvider,
  Theme,
  YStack,
  XStack,
  Button,
} from "tamagui";
import KeypadNumber from "../code-view/KeypadNumber";
import config from "../../tamagui.config";
import ShakeAnimation from "../code-view/AnimatedDots";

export default function EnterPIN({ navigation }) {
  const PIN = "5518";
  const [buffer, setBuffer] = useState("");

  const handleKeyPress = (key: string) => {
    if (buffer.length < 4) {
      setBuffer(buffer + key);
    }
    if ((buffer + key).length >= 4 && buffer + key !== PIN) {
      // const options = {
      //   enableVibrateFallback: true, // Fallback to vibration if haptic feedback is not supported
      // };

      // HapticFeedback.trigger("impactLight", options);
      if (Platform.OS === "ios") {
        Vibration.vibrate(100);
      } else if (Platform.OS === "android") {
        Vibration.vibrate(100);
      }

      setTimeout(() => {
        setBuffer("");
      }, 300);
    }
    if (buffer + key === PIN) {
      setTimeout(() => {
        // navigation.navigate("POS");
        navigation.replace("POS");
        setBuffer("");
      }, 300);
    }
  };

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack
          space
          f={1}
          jc="center"
          ai="center"
          // backgroundColor={"$backgroundSoft"}
          backgroundColor={"#fff"}
        >
          <H3>Entrez votre PIN</H3>

          <ShakeAnimation isCorrect={buffer === PIN} buffer={buffer} />
          <Spacer />
          <YStack space ai="center" jc="center">
            <XStack space>
              <KeypadNumber content="1" onPress={() => handleKeyPress("1")} />
              <KeypadNumber content="2" onPress={() => handleKeyPress("2")} />
              <KeypadNumber content="3" onPress={() => handleKeyPress("3")} />
            </XStack>
            <XStack space>
              <KeypadNumber content="4" onPress={() => handleKeyPress("4")} />
              <KeypadNumber content="5" onPress={() => handleKeyPress("5")} />
              <KeypadNumber content="6" onPress={() => handleKeyPress("6")} />
            </XStack>
            <XStack space>
              <KeypadNumber content="7" onPress={() => handleKeyPress("7")} />
              <KeypadNumber content="8" onPress={() => handleKeyPress("8")} />
              <KeypadNumber content="9" onPress={() => handleKeyPress("9")} />
            </XStack>
            <XStack space>
              <Button
                onPress={() => setBuffer("")}
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: "transparent",
                }}
                icon={<XSquare size="$3" />}
              />
              <KeypadNumber content="0" onPress={() => handleKeyPress("0")} />
              <Button
                onPress={() => setBuffer(buffer.slice(0, -1))}
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: "transparent",
                }}
                icon={<Delete size="$3" />}
              />
            </XStack>
          </YStack>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
