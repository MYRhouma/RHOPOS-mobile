import React, { useState, useEffect, useContext } from "react";
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
  ActivityIndicator,
} from "react-native";
import {
  ShoppingBag,
  AlignLeft,
  ArrowRight,
  ChevronDown,
} from "@tamagui/lucide-icons";
import {
  H3,
  H6,
  Text,
  TamaguiProvider,
  Theme,
  Spacer,
  YStack,
  Input,
  Button,
  // View,
  XStack,
  Spinner,
  Image,
  Paragraph,
  H2,
  ListItem,
  Card,
  H1,
} from "tamagui";
import config from "../../tamagui.config";
import axios from "axios";
import ProductButton from "../pos-view/ProductButton";
import CategoryButton from "../pos-view/CategoryButton";
import { log } from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../auth/Authentication";
import { useNetInfo } from "@react-native-community/netinfo";

export default function POS({ navigation }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const { accessToken, refreshToken, logout, generateNewAccessToken } =
    useContext(AuthContext);

  const netInfo = useNetInfo();
  useEffect(() => {
    // alert(`Type: ${netInfo.type} \n Is Connected? ${netInfo.isConnected}`);
  }, [netInfo.isConnected]);
  // let route = useRoute();
  // let authentication = route.params.authentication;
  //https://rhopos.live/api/categories/(businessid)
  //https://rhopos.live/api/products/(businessid)/(categoryid)
  const [OldDiscount, setOldDiscount] = useState(0);
  const [table, setTable] = useState(0);

  const [isLoadingCategories, setLoadingCategories] = useState(true);
  const [isLoadingProducts, setLoadingProducts] = useState(true);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [ProductsData, setProductsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  const GetProductsAPI = (catid: number) => {
    const headers = {
      Authorization: `JWT ${accessToken}`,
    };
    axios
      .get("https://rhopos.live/api/products/" + catid.toString(), {
        headers,
      })
      .then((QS) => {
        // alert(JSON.stringify(QS.data.data));
        setProductsData(QS.data);
        // console.log(QS.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Handle the 401 error (token refresh failed)
          // For example, you can redirect the user to the login screen
          console.log("Token refresh failed: 401 Unauthorized");
          generateNewAccessToken(refreshToken);
        } else {
          // Handle other errors
          console.log(error);
        }
      })
      .finally(() => setLoadingProducts(false));
  };

  const GetCategoriesAPI = () => {
    const headers = {
      Authorization: `JWT ${accessToken}`,
    };
    axios
      // .get("https://rhopos.live/api/categories/1?format=vnd.api%2Bjson")
      .get("https://rhopos.live/api/categories/", { headers })
      .then((QS) => {
        // alert(JSON.stringify(QS.data.data));
        setCategoriesData(QS.data);
        // console.log(QS.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Handle the 401 error (token refresh failed)
          // For example, you can redirect the user to the login screen
          console.log("Token refresh failed: 401 Unauthorized");
          generateNewAccessToken(refreshToken);
        } else {
          // Handle other errors
          console.log(error);
        }
      })
      .finally(() => setLoadingCategories(false));
  };

  if (isLoadingCategories) GetCategoriesAPI();

  useEffect(() => {
    if (CategoriesData.length > 0) GetProductsAPI(CategoriesData[0].id);
  }, [isLoadingCategories]);
  useEffect(() => {
    if (cartItems.length === 0) setTotalQuantity(0);
  }, [cartItems]);

  // if (isLoadingProducts) {
  //   GetCategoriesAPI();
  //   console.log("TTT", CategoriesData);
  //   // if (CategoriesData) GetProductsAPI(CategoriesData[0].id);
  //   setLoadingProducts(false);
  // }
  // useEffect(() => {
  // if (CategoriesData) GetProductsAPI(CategoriesData[0].id);
  // }, []);

  const [totalQuantity, setTotalQuantity] = useState(0); // State for the total quantity

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      {/* <Theme name={colorScheme === "dark" ? "dark" : "light"}> */}
      <Theme name="dark">
        {/* <StatusBar style="auto" /> */}
        <StatusBar style="light" />

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
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                logout();
              }}
            >
              <Text>Déconnexion</Text>
            </TouchableOpacity>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingRight: 5 }}>Table 5</Text>
              <ChevronDown />
            </View> */}
          </View>
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              {
                // paddingBottom: 25,
              }
            }
          > */}

          {isLoadingCategories ? (
            <Spinner size="small" />
          ) : (
            <FlatList
              style={{ maxHeight: 100 }} // MAX HEIGHT CATEGORY SECTION
              showsHorizontalScrollIndicator={false}
              horizontal
              data={CategoriesData}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <CategoryButton
                  id={item.id}
                  name={item.name}
                  color={item.color}
                  nbArticle={item.product_count}
                  updateProductList={() => {
                    GetProductsAPI(item.id);
                  }}
                />
              )}
            />
          )}

          {/* <CategoryButton name="Sandwish" color="#E4CDED" nbArticle={5} />
            <CategoryButton name="Déjeuner" color="#CFDDDB" nbArticle={7} />
            <CategoryButton name="Boissons" color="#C2DBE9" nbArticle={2} />
            <CategoryButton name="Cafés" color="#F1C8D0" nbArticle={13} />
            <CategoryButton name="Desserts" color="#C9CAEF" nbArticle={11} /> */}
          {/* </ScrollView> */}
          <View
            style={{
              overflow: "hidden",
            }}
          >
            <View
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#292b2d",
                marginTop: 10,
                marginBottom: -1,
                height: 0,
                width: "95%",
                alignSelf: "center",
              }}
            />
          </View>
          {/* <Button
            onPress={() => {
              setCartItems([]);
            }}
          >
            Reset
          </Button> */}
          {isLoadingProducts ? (
            // <Spinner
            //   style={{
            //     alignSelf: "center",
            //     justifyContent: "center",
            //     margin: 20,
            //   }}
            //   size="small"
            // />
            <Spinner size="large" />
          ) : (
            // <H6>Veuillez choisir une categorie de produits</H6>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              numColumns={2}
              data={ProductsData}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <ProductButton
                  product={item}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  color={item.product_category_color}
                  name={item.name}
                  price={item.price.toFixed(3)}
                  prevTotalQuantity={totalQuantity}
                  setTotalQuantity={setTotalQuantity}
                />
              )}
            />
          )}
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              margin: "auto",
              width: "100%",
              justifyContent: "space-evenly",
              paddingBottom: 90,
              // borderTopColor: "#292b2d",
              // borderWidth: 1,
            }}
          > */}
          {/* <ProductButton
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
          
            /> */}
          {/* </ScrollView> */}

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
                  navigation.navigate("Cart", {
                    cartItems,
                    setCartItems,
                    // setCartItems, NON SERIALISABLE A NE PAS GARDER !
                    OldDiscount,
                    setOldDiscount,
                    table,
                    // setTable,
                  });
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
