import React, { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  useColorScheme,
  Vibration,
  FlatList,
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";
import { ShoppingBag, AlignLeft } from "@tamagui/lucide-icons";
import {
  H3,
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
  ScrollView,
  Paragraph,
  H2,
  ListItem,
  Card,
} from "tamagui";
import config from "../../tamagui.config";
export default function POS() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const X = 8;

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      {/* <Theme name={colorScheme === "dark" ? "dark" : "light"}> */}
      <Theme name="light">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#111315" }}>
          <View>
            <AlignLeft />
            <Text>Table 5</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 25,
            }}
          >
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
            <Button style={styles.block}></Button>
          </ScrollView>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              margin: "auto",
              width: "100%",
              justifyContent: "space-evenly",
              paddingBottom: 90,
            }}
          >
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
            <Button style={styles.block2}></Button>
          </ScrollView>
          {X > 0 ? (
            <View
              style={{
                position: "absolute",
                bottom: 30,
                width: "100%",
                height: 80,
                justifyContent: "center",
                backgroundColor: "#111315",
              }}
            >
              <Button
                animation="bouncy"
                size="$5"
                style={{
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: 100,
                  // zIndex: 9999,
                }}
              >
                <Button.Text>
                  Il y a {X} produit{X > 1 ? "s" : ""} dans le <ShoppingBag />
                </Button.Text>
              </Button>
            </View>
          ) : (
            ""
          )}
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    width: 100,
    height: 100,
    backgroundColor: "#292b2d",
    margin: 10,
  },
  block2: {
    width: "45%",
    height: 110,
    backgroundColor: "#686868",
    marginTop: 10,
    marginBottom: 5,
  },
});
