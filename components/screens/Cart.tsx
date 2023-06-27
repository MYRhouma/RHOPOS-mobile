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
  let route = useRoute();

  let cartItems = route.params.cartItems;
  // let setCartItems = route.params.setCartItems;
  let discount = route.params.discount;
  // let setDiscount = route.params.setDiscount;
  // let table = route.params.table;
  // let setTable = route.params.setTable;
  let subTotal: number = cartItems
    .reduce((sum: number, product) => Number(sum) + Number(product.price), 0)
    .toFixed(3);
  let discountPercentage = discount * 100;
  let discountedAmount: string = (subTotal * discount).toFixed(3);
  let TVA: number = 10;
  let TVAamount: string = ((subTotal * TVA) / 100).toFixed(3);
  let Total: string = (subTotal - discountedAmount).toFixed(3);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

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
                name={item.name}
                quantity={item.quantity}
                price={item.price.toFixed(3)}
              />
            )}
          />

          <LinearGradient
            style={{ position: "absolute", bottom: "44%", zIndex: 1 }}
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
              height: "40%",
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
              {/* <View style={styles.compta}>
                <Text style={{ color: "#ababab", marginTop: 30 }}>
                  Méthode de paiement
                </Text>
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
                <View>
                  <TouchableOpacity style={styles.paymentMethodActive}>
                    <DollarSign
                      style={styles.paymentMethodIcon}
                      color="#000"
                      size="$2"
                    />
                  </TouchableOpacity>
                  <Text style={{ alignSelf: "center", paddingTop: 6 }}>
                    Espèces
                  </Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.paymentMethod}>
                    <CreditCard style={styles.paymentMethodIcon} size="$2" />
                  </TouchableOpacity>
                  <Text style={{ alignSelf: "center", paddingTop: 6 }}>
                    Carte
                  </Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.paymentMethod}>
                    <Nfc style={styles.paymentMethodIcon} size="$2" />
                  </TouchableOpacity>
                  <Text style={{ alignSelf: "center", paddingTop: 6 }}>
                    NFC
                  </Text>
                </View>
              </View> */}
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
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderColor: "#fff",
  },
  paymentMethodActive: {
    borderRadius: 8,
    borderWidth: 0.5,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderColor: "#000",
    backgroundColor: "#fff",
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
});
