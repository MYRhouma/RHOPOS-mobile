import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, Vibration, Platform, Image } from "react-native";
import { Delete, XSquare } from "@tamagui/lucide-icons";
import {
  H3,
  Spacer,
  TamaguiProvider,
  Theme,
  YStack,
  XStack,
  Input,
  Button,
} from "tamagui";
import config from "../../tamagui.config";
import axios from "axios";
// import { login, newAccessToken } from "../auth/Authentication";
// import { authentication, setAuthentication } from "../auth/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash({ navigation }) {
  // const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const localStorage = async () => {
        try {
          const pinCode = await AsyncStorage.getItem("pinCode");
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          if (!refreshToken) navigation.replace("Login");
          else if (!pinCode) navigation.replace("CreatePIN");
          else navigation.replace("EnterPIN");
        } catch (error) {
          console.error("Error:", error);
        }
      };
      localStorage();
    }, 1000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const localStorage = async () => {
  //       try {
  //         navigation.replace("Login");
  //         // const refreshToken = await AsyncStorage.getItem("refreshToken");
  //         // const pinCode = await AsyncStorage.getItem("pinCode");
  //         // const pinCode = "5518";
  //         // console.log("refreshToken : ", refreshToken);
  //         // if (!refreshToken) {
  //         //   navigation.replace("Login");
  //         // } else if (!pinCode) {
  //         //   navigation.replace("CreatePIN");
  //         // } else {
  //         //   // navigation.replace("EnterPIN");
  //         // }
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };
  //     localStorage();
  //   }, 1000);
  // }, []);
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
          <Image
            style={{ borderRadius: 40 }}
            source={require("../../assets/192.png")}
          />
          <H3>Bienvenue sur RHO POS</H3>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
