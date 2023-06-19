import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ArrowRight, PlusSquare, MinusSquare } from "@tamagui/lucide-icons";
import { Button, Text, H6 } from "tamagui";

interface Props {
  name: string;
  color: string;
}

const CategoryButton = ({ name, color }: Props) => {
  const styles = StyleSheet.create({
    block: {
      // width: 100,
      // height: 100,
      borderRadius: 8,
      backgroundColor: color,
      margin: 10,
      padding: 20,
      justifyContent: "center", // Vertically center align items
    },
  });
  return (
    <TouchableOpacity style={styles.block}>
      <H6 style={{ alignSelf: "center", color: "#111315" }}>{name}</H6>
    </TouchableOpacity>
  );
};

export default CategoryButton;
