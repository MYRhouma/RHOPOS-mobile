import React, { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "tamagui/linear-gradient";
import ProductCard from "../cart-view/ProductCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  useColorScheme,
  Vibration,
  FlatList,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { ChevronLeft } from "@tamagui/lucide-icons";
import {
  H3,
  H6,
  H5,
  Text,
  TamaguiProvider,
  Theme,
  Spacer,
  YStack,
  Input,
  Button,
  // View,
  XStack,
  Image,
  Paragraph,
  H2,
  ListItem,
  Card,
} from "tamagui";

import dark from "../../theme-dark";
import config from "../../tamagui.config";
export default function Table({ navigation }) {
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
      {/* <Theme name={colorScheme === "dark" ? "dark" : "light"}> */}
      <Theme>
        <StatusBar style="light" />

        <SafeAreaView style={{ flex: 1, backgroundColor: "#111315" }}>
          <XStack
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ChevronLeft size={35} />
            </TouchableOpacity>
            <H3 style={{ alignSelf: "center" }}>Tables</H3>
          </XStack>
          <Text>Tables wallah</Text>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-around",
  },
});
