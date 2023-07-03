import React, { useState, useEffect, useContext, useRef } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, TouchableOpacity, View, Text } from "react-native";
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
// import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../auth/Authentication";

interface Props {
  setDiscount: (x: string) => void;
  discount: number;
  bottomSheetModalRef: () => void;
}

export default function Discount({
  discount,
  setDiscount,
  bottomSheetModalRef,
}: Props) {
  const [buffer, setBuffer] = useState("");
  useEffect(() => {
    setBuffer((discount * 100).toString());
  }, []);
  useEffect(() => {
    console.log(discount);
  }, [discount]);
  const handleKeyPress = (key: string) => {
    if (
      buffer.length < 7 &&
      !(buffer.length === 0 && key === ".") &&
      !(buffer[0] === "0" && buffer.length === 1 && key === "0") &&
      !(buffer.indexOf(".") !== -1 && key === ".")
    )
      if (parseFloat(buffer + key) > 100) setBuffer("100");
      else setBuffer(buffer + key);
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
    <YStack space ai="center" jc="center">
      <View
        style={{
          backgroundColor: "#686868",
          marginVertical: 20,
          minWidth: 150,
          justifyContent: "center",
          minHeight: 50,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            paddingHorizontal: 10,
            textAlign: "center",
          }}
        >
          {buffer} %
        </Text>
      </View>
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
        <KeypadNumber content="." onPress={() => handleKeyPress(".")} />

        <KeypadNumber content="0" onPress={() => handleKeyPress("0")} />
        <Button
          onPress={() => setBuffer(buffer.slice(0, -1))}
          style={{
            width: 80,
            height: 80,
            backgroundColor: "transparent",
          }}
          icon={<Delete size="$3" />}
        />
      </XStack>
      <Button
        onPress={() => {
          if (buffer === "") setDiscount(0);
          else setDiscount(parseFloat(buffer) / 100);
          bottomSheetModalRef.current?.dismiss();
        }}
        style={{
          // width: "50%",
          // height: 80,
          backgroundColor: "green",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Appliquer
      </Button>
    </YStack>
  );
}
