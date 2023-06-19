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
  TouchableOpacity,
} from "react-native";
import {
  ShoppingBag,
  AlignLeft,
  ArrowRight,
  ChevronDown,
} from "@tamagui/lucide-icons";
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
import ProductButton from "../pos-view/ProductButton";
export default function POS({ navigation }) {
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
      <Theme name="dark">
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#111315",
            // width: "95%",
            // alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
              width: "90%",
              margin: 10,
            }}
          >
            <AlignLeft />
            <Text>
              Table 5 <ChevronDown />
            </Text>
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
              borderTopColor: "#292b2d",
              borderWidth: 1,
            }}
          >
            <ProductButton name="Makloub" price="9.30" />
            <ProductButton name="Panini" price="9.30" />
            <ProductButton name="Sandwish" price="9.30" />
            <ProductButton name="Burger" price="9.30" />
            <ProductButton name="Libanais" price="9.30" />
            <ProductButton name="Malfouf" price="9.30" />
            <ProductButton name="Mlawi" price="9.30" />
            <ProductButton name="Chapati" price="9.30" />
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
                themeInverse
                animation="bouncy"
                size="$5"
                onPress={() => {
                  navigation.navigate("Cart");
                }}
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
