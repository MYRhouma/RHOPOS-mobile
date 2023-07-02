import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { ArrowRight, Plus, Minus } from "@tamagui/lucide-icons";
import { Button, Text, H6 } from "tamagui";

interface Props {
  product: {};
  name: string;
  color: string;
  price: string;
  cartItems: never[];
  setCartItems: (cartItems: never[]) => void;
  prevTotalQuantity: number;
  setTotalQuantity: (x: number) => void;
}

const ProductButton = ({
  product,
  name,
  color,
  price,
  cartItems,
  setCartItems,
  prevTotalQuantity,
  setTotalQuantity,
}: Props) => {
  //synchroniser les quantité des produits avec celle du panier quand on change de categorie garde la méme quantité
  // console.log("Cart :", cartItems);
  var article;
  // console.log(product.id);
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === product.id) {
      article = cartItems[i];
    }
  }

  const [qty, setQty] = useState(article ? article.quantity : 0);

  const LeftBorderWidth = 5;
  const windowWidth = Dimensions.get("window").width; // Get the width of the window

  const [widthValue, setWidthValue] = useState(
    new Animated.Value(LeftBorderWidth)
  );
  const [isFilled, setIsFilled] = useState(false);

  const UpdateBorderWidthAnimation = (
    width: number,
    skipAnimation: bool = false
  ) => {
    if (!skipAnimation)
      Animated.timing(widthValue, {
        toValue: width,
        duration: 300, // Durée de l'animation en millisecondes
        useNativeDriver: false, // Utilisation du pilote natif pour les animations
      }).start();
    else
      Animated.timing(widthValue, {
        toValue: width,
        duration: 0, // Durée de l'animation en millisecondes
        useNativeDriver: false, // Utilisation du pilote natif pour les animations
      }).start();
  };
  const IncrementQty = (qty: number) => {
    qty = ++qty;
    setQty(qty);
    setTotalQuantity(prevTotalQuantity + 1);
    let updatedItems = cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    setCartItems(updatedItems);
    if (qty === 1) {
      // UpdateBorderWidthAnimation(windowWidth * 0.45); //45% de largeurr taa l'ecran
      // setIsFilled(true);
      product.quantity = 1;
      // console.log(product);
      setCartItems([...cartItems, product]);
    } else {
      article.quantity = qty;
    }
    // console.log(cartItems);
  };

  const DecrementQty = (qty: number) => {
    if (qty > 0) {
      qty = --qty;
      setQty(qty);
      setTotalQuantity(prevTotalQuantity - 1);
      let updatedItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: qty };
        }
        return item;
      });
      setCartItems(updatedItems);
      //check if mawjoud and update qty
      if (article) {
        article.quantity = qty;
      }
    }
    if (qty == 0) {
      // UpdateBorderWidthAnimation(LeftBorderWidth);
      // setIsFilled(false);
      //check if mawjoud et supprimer
      if (article)
        setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
    // console.log(cartItems);
  };
  useEffect(() => {
    // Function to execute on page load

    if (article && article.quantity > 0) {
      setIsFilled(true);
      UpdateBorderWidthAnimation(windowWidth * 0.45, true);
    }
  }, []);
  useEffect(() => {
    if (qty === 0) {
      UpdateBorderWidthAnimation(LeftBorderWidth);
      setIsFilled(false);
    } else if (qty === 1) {
      UpdateBorderWidthAnimation(windowWidth * 0.45); //45% de largeurr taa l'ecran
      setIsFilled(true);
    }
  }, [qty]);
  useEffect(() => {
    if (cartItems.length === 0) {
      setQty(0);
    }
  }, [cartItems]);

  const animatedStyle = {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: color,
    height: 118,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: isFilled ? 8 : 0,
    borderBottomRightRadius: isFilled ? 8 : 0,
    width: widthValue,
    zIndex: -1,
  };

  const styles = StyleSheet.create({
    product: {
      padding: 10,
      // flexDirection: "column",
      borderRadius: 8,
      width: "45%",
      // alignItems: "center",
      // justifyContent: "center",
      // flex: 1,
      margin: 5,
      // height: 110,
      backgroundColor: "#292b2d",
      marginTop: 10,
      paddingLeft: 15,
      marginBottom: 5,
    },
    IncBtn: {
      borderWidth: 1.5,
      borderColor: isFilled ? "#686868" : "#ababab",
      borderRadius: 8,
    },
    DecBtn: {
      borderWidth: 1.5,
      borderColor: "#686868",
      borderRadius: 8,
    },
  });

  // const product = cartItems.find((product) => product.id === id);

  // if (product) {
  //   setQty(product.quantity);
  // } else {
  //   setQty(0);
  // }
  return (
    <View style={styles.product}>
      <Text style={{ fontSize: 11, color: isFilled ? "#686868" : "#ababab" }}>
        Commande <ArrowRight color={isFilled ? "#000" : "#fff"} size={13} />{" "}
        Cuisine
      </Text>
      <H6 style={{ color: isFilled ? "#292b2d" : "#fff" }}>{name}</H6>
      <Text style={{ color: isFilled ? "#686868" : "#ababab" }}>
        {price} DT
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <View
          style={{
            // backgroundColor: "purple",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            // paddingVertical: 10,
            paddingTop: 5,
          }}
        >
          <TouchableOpacity
            style={styles.DecBtn}
            onPress={() => {
              DecrementQty(qty);
            }}
          >
            <Minus color={"#686868"} size={32} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 10,
              color: isFilled ? "#686868" : "#fff",
              alignSelf: "center", // Vertically center align text within the container
            }}
          >
            {qty}
          </Text>
          <TouchableOpacity
            style={styles.IncBtn}
            onPress={() => {
              IncrementQty(qty);
            }}
          >
            <Plus color={isFilled ? "#686868" : "#ababab"} size={32} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Bordure a gauche qui se fill */}
      <Animated.View style={animatedStyle}></Animated.View>
    </View>
  );
};

export default ProductButton;
