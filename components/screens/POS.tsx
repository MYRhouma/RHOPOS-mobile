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
import CategoryButton from "../pos-view/CategoryButton";

export default function POS({ navigation }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const [totalQuantity, setTotalQuantity] = useState(0); // State for the total quantity

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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingRight: 5 }}>Table 5</Text>
              <ChevronDown />
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 25,
            }}
          >
            <CategoryButton name="Sandwish" color="#E4CDED" />
            <CategoryButton name="Déjeuner" color="#CFDDDB" />
            <CategoryButton name="Boissons" color="#C2DBE9" />
            <CategoryButton name="Cafés" color="#F1C8D0" />
            <CategoryButton name="Desserts" color="#C9CAEF" />
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
            <ProductButton
              name="Makloub"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Panini"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Sandwish"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Burger"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Libanais"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Malfouf"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Mlawi"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
            <ProductButton
              name="Chapati"
              price="9.30"
              prevTotalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
          </ScrollView>
          {totalQuantity > 0 ? (
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
                  width: "85%",
                  alignSelf: "center",
                  borderRadius: 100,
                  // zIndex: 9999,
                }}
              >
                <Button.Text>
                  Il y a {totalQuantity} produit{totalQuantity > 1 ? "s" : ""}{" "}
                  dans le <ShoppingBag />
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
