import React, { useState, useEffect, useContext } from "react";
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
  Input,
  Button,
} from "tamagui";
import config from "../../tamagui.config";
import axios from "axios";
// import { login, newAccessToken } from "../auth/Authentication";
// import { authentication, setAuthentication } from "../auth/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../auth/Authentication";

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authentication, setAuthentication] = useState({
  //   isAuthenticated: false,
  //   email: "",
  //   accessToken: "",
  //   refreshToken: "",
  // });

  // useEffect(() => {
  //   console.log(authentication);
  //   if (
  //     authentication.isAuthenticated &&
  //     authentication.accessToken &&
  //     authentication.refreshToken
  //   ) {
  //     const localStorage = async (authentication: {
  //       isAuthenticated: boolean;
  //       email: string;
  //       accessToken: string;
  //       refreshToken: string;
  //     }) => {
  //       try {
  //         // const pinCode = await AsyncStorage.getItem("pinCode");

  //         // const accessToken = await AsyncStorage.getItem("accessToken");
  //         // const refreshToken = await AsyncStorage.getItem("refreshToken");
  //         // console.log("AT : ", accessToken, " RT : ", refreshToken);
  //         console.log(authentication);
  //         // if (!accessToken || !refreshToken) {
  //         await AsyncStorage.setItem("accessToken", authentication.accessToken);
  //         await AsyncStorage.setItem(
  //           "refreshToken",
  //           authentication.refreshToken
  //         );
  //         // }
  //         navigation.replace("CreatePIN");
  //         // navigation.replace("EnterPIN", { authentication });
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };
  //     localStorage(authentication);
  //   }
  // }, [authentication]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  // const newAccessToken = (refreshToken: string) => {
  //   axios
  //     .post("https://rhopos.live/auth/jwt/refresh", {
  //       refresh: refreshToken,
  //     })
  //     .then((res) => {
  //       setAuthentication({
  //         ...authentication,
  //         accessToken: res.data.access,
  //       });
  //       console.log({
  //         ...authentication,
  //         accessToken: res.data.access,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
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
          <H3>Connexion</H3>
          <Input
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            size="$5"
            borderColor="#111315"
            placeholderTextColor="#111315"
            width="80%"
            placeholder="Email"
          />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            size="$5"
            borderColor="#111315"
            placeholderTextColor="#111315"
            width="80%"
            placeholder="Mot de passe"
            secureTextEntry
          />
          <Button
            themeInverse
            size="$4.5"
            onPress={() => {
              login(email, password);
            }}
          >
            Suivant
          </Button>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
