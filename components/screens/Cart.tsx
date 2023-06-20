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
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  ArrowRight,
  Nfc,
  Divide,
} from "@tamagui/lucide-icons";
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
import { useRoute } from "@react-navigation/native";

import dark from "../../theme-dark";
import config from "../../tamagui.config";
export default function Cart({ navigation }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  let route = useRoute();

  // console.log(route.params.cartItems);
  let cartItems = route.params.cartItems;
  let setCartItems = route.params.setCartItems;
  let discount = route.params.discount;
  let setDiscount = route.params.setDiscount;
  let table = route.params.table;
  let setTable = route.params.setTable;
  let subTotal: number = cartItems
    .reduce(
      (sum: number, product) => Number(sum) + Number(product.attributes.price),
      0
    )
    .toFixed(3);
  let discountPercentage = discount * 100;
  let discountedAmount: number = subTotal * discount;
  let TVA: number = 10;
  let TVAamount: string = ((subTotal * TVA) / 100).toFixed(3);
  let Total: string = (subTotal - discountedAmount).toFixed(3);

  // console.log(subTotal);
  return (
    <TamaguiProvider config={config}>
      {/* <Theme name={colorScheme === "dark" ? "dark" : "light"}> */}
      <Theme>
        <StatusBar style="light" />

        <SafeAreaView style={{ flex: 1, backgroundColor: "#111315" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            data={cartItems}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ProductCard
                name={item.attributes.name}
                quantity={item.quantity}
                price={item.attributes.price.toFixed(3)}
              />
            )}
          />

          <LinearGradient
            style={{ position: "absolute", bottom: "64%", zIndex: 1 }}
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
              justifyContent: "space-between",
              width: "100%",
              height: "60%",
              backgroundColor: "transparent",
              flexDirection: "column",
              paddingTop: 20,
            }}
          >
            {/* debut Compta Text sous total reduciton total et bordure dashed */}

            <View style={styles.container}>
              <View style={styles.compta}>
                <Text>Sous-total</Text>
                <Text>{subTotal} DT</Text>
              </View>
              {discount > 0 ? (
                <View style={styles.compta}>
                  <Text>Réduction</Text>
                  <Text>- {discountedAmount} DT</Text>
                </View>
              ) : null}
              <View style={styles.compta}>
                <Text>TVA {TVA}%</Text>
                <Text>{TVAamount} DT</Text>
              </View>
              <View style={styles.containerDashedBorder}>
                <View style={styles.dashedBorder} />
              </View>

              <View style={styles.compta}>
                <H3>Total</H3>
                <H3>{Total} DT</H3>
              </View>
              <View style={styles.compta}>
                <Text style={{ color: "#ababab", marginTop: 30 }}>Méthode</Text>
              </View>
              <View
                style={{
                  // backgroundColor: "blue",
                  alignSelf: "center",
                  width: "80%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.paymentMethod}>
                  <DollarSign style={styles.paymentMethodIcon} size="$2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <CreditCard style={styles.paymentMethodIcon} size="$2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Nfc style={styles.paymentMethodIcon} size="$2" />
                </TouchableOpacity>
              </View>
              <Button
                themeInverse
                animation="bouncy"
                size="$5"
                style={{
                  width: "85%",
                  alignSelf: "center",
                  marginTop: 20,
                  // zIndex: 9999,
                }}
              >
                <Button.Text>
                  Valider la commande <ArrowRight />
                  {/* <ShoppingBag /> */}
                </Button.Text>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "purple",
    flexGrow: 1,
    // justifyContent: "space-around",
  },
  paymentMethod: {
    // flexGrow: 1,
    // backgroundColor: "red",
    // marginHorizontal: 10,

    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderColor: "#fff",
  },
  paymentMethodIcon: { alignSelf: "center" },
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
