import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ArrowRight, PlusSquare, MinusSquare } from "@tamagui/lucide-icons";
import { Button, Text, H6 } from "tamagui";

interface Props {
  name: string;
  price: string;
  prevTotalQuantity: number;
  setTotalQuantity: () => void;
}

const ProductButton = ({
  name,
  price,
  prevTotalQuantity,
  setTotalQuantity,
}: Props) => {
  const [qty, setQty] = useState(0);
  const IncrementQty = (qty: number) => {
    setQty(qty + 1);
    setTotalQuantity(prevTotalQuantity + 1);
  };
  const DecrementQty = (qty: number) => {
    if (qty > 0) {
      setQty(qty - 1);
      setTotalQuantity(prevTotalQuantity - 1);
    }
  };
  return (
    <View style={styles.product}>
      <Text style={{ fontSize: 11, color: "#ababab" }}>
        Commande <ArrowRight size={13} /> Cuisine
      </Text>
      <H6>{name}</H6>
      <Text style={{ color: "#ababab" }}>{price} DT</Text>
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
            width: "60%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              DecrementQty(qty);
            }}
          >
            <MinusSquare color={qty > 0 ? "#ababab" : "#686868"} size={32} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              alignSelf: "center", // Vertically center align text within the container
            }}
          >
            {qty}
          </Text>
          <TouchableOpacity
            onPress={() => {
              IncrementQty(qty);
            }}
          >
            <PlusSquare color="#ababab" size={32} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 5,
          backgroundColor: "#E4CDED",
          height: 110,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      ></View>
    </View>
  );
};

export default ProductButton;

const styles = StyleSheet.create({
  product: {
    padding: 10,
    // flexDirection: "column",
    borderRadius: 8,
    width: "45%",
    height: 110,
    backgroundColor: "#292b2d",
    marginTop: 10,
    paddingLeft: 15,
    marginBottom: 5,
  },
});
