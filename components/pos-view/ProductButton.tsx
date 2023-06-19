import { StyleSheet, View, TouchableOpacity } from "react-native";

import { ArrowRight, PlusSquare, MinusSquare } from "@tamagui/lucide-icons";
import { Button, Text, H6 } from "tamagui";

interface Props {
  name: string;
  price: string;
}

const ProductButton = ({ name, price }: Props) => {
  return (
    <TouchableOpacity style={styles.product}>
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
        <Text style={{ textAlign: "center", justifyContent: "center" }}>
          <MinusSquare color="#686868" />
          <Text style={{ fontSize: 18 }}> 0 </Text>
          <PlusSquare color="#ababab" />
        </Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 5,
  },
});
