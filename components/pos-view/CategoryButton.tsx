import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ArrowRight, PlusSquare, MinusSquare } from "@tamagui/lucide-icons";
import { Button, Text, H6 } from "tamagui";

interface Props {
  id: number;
  name: string;
  color: string;
  nbArticle: number;
  updateProductList: () => void;
}

const CategoryButton = ({
  id,
  name,
  color,
  nbArticle,
  updateProductList,
}: Props) => {
  const styles = StyleSheet.create({
    block: {
      // width: 100,
      // height: 100,
      borderRadius: 8,
      backgroundColor: color,
      marginHorizontal: 10,
      padding: 20,
      justifyContent: "center", // Vertically center align items
    },
  });
  return (
    <TouchableOpacity style={styles.block} onPress={updateProductList}>
      <H6 style={{ alignSelf: "center", color: "#111315" }}>{name}</H6>
      <Text style={{ color: "#686868", fontSize: 10 }}>
        {nbArticle ? nbArticle : "0"} produit{nbArticle > 1 ? "s" : ""}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
