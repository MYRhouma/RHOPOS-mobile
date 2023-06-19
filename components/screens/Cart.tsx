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
} from "react-native";
import { ShoppingBag, ArrowRight } from "@tamagui/lucide-icons";
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
export default function Cart() {
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
          <ScrollView contentContainerStyle={{}}>
            <ProductCard name="Fish soup" quantity={3} price={"9.30"} />
            <ProductCard name="Fish soup" quantity={5} price={"9.30"} />
            <ProductCard name="Fish soup" quantity={2} price={"9.30"} />
            <ProductCard name="Mloukhia" quantity={1} price={"9.30"} />
            <ProductCard name="Fish soup" quantity={3} price={"9.30"} />
          </ScrollView>
          <LinearGradient
            style={{ position: "absolute", top: "60%", zIndex: 1 }}
            width="100%"
            height="$1"
            colors={["transparent", "#111315"]}
            start={[0, 0]}
            end={[0, 1]}
          />
          <View
            style={{
              // position: "absolute",
              // bottom: 0,
              justifyContent: "space-around",
              width: "100%",
              height: "50%",
              backgroundColor: "transparent",
            }}
          >
            {/* debut Compta Text sous total reduciton total et bordure dashed */}
            <View style={styles.container}>
              <View style={styles.compta}>
                <Text>Sous-total</Text>
                <Text>23.50 $</Text>
              </View>
              <View style={styles.compta}>
                <Text>Réduction</Text>
                <Text>- 10.00 $</Text>
              </View>
              <View style={styles.compta}>
                <Text>TVA 10%</Text>
                <Text>2.35 $</Text>
              </View>
              <View style={styles.containerDashedBorder}>
                <View style={styles.dashedBorder} />
              </View>

              <View style={styles.compta}>
                <H3>Total</H3>
                <H3>15.85 $</H3>
              </View>
            </View>
            <Button
              themeInverse
              animation="bouncy"
              size="$5"
              style={{
                width: "85%",
                alignSelf: "center",
                marginTop: 40,
                // zIndex: 9999,
              }}
            >
              <Button.Text>
                Valider la commande <ArrowRight />
                {/* <ShoppingBag /> */}
              </Button.Text>
            </Button>
          </View>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-around",
  },
  containerDashedBorder: {
    overflow: "hidden",
  },
  dashedBorder: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ababab",
    marginTop: 10,
    marginBottom: -1,
    height: 0,
    width: "85%",
    alignSelf: "center",
  },

  compta: {
    width: "85%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    // paddingHorizontal: 20,
    paddingVertical: 5,
  },
  quantityText: {
    color: "#ababab",
  },
  card: {
    width: "85%",
    alignSelf: "center",
    // height: 110,
    backgroundColor: "#292b2d",
    // marginTop: 10,
    // marginBottom: 5,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
