import { StyleSheet, View } from "react-native";
import {
  Swipeable,
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Trash2 } from "@tamagui/lucide-icons";
import { Button, Text } from "tamagui";
interface Props {
  name: string;
  quantity: number;
  price: string;
}

const ProductCard = ({ name, quantity, price }: Props) => {
  const styles = StyleSheet.create({
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
  const leftSwipe = () => {
    return (
      <Button animation="bouncy" style={{ marginRight: 20, height: "100%" }}>
        <Trash2 color="white" />
      </Button>
    );
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={leftSwipe}>
        <View style={styles.card}>
          <Text>
            {name} <Text style={styles.quantityText}>x{quantity}</Text>
          </Text>

          <Text>{price} DT</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ProductCard;
