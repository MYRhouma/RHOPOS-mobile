import EnterPIN from "./components/screens/EnterPIN";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import POS from "./components/screens/POS";
import Cart from "./components/screens/Cart";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="EnterPIN"
          component={EnterPIN}
          options={{
            title: "", //no title
            headerStyle: { backgroundColor: "#fff" },
            headerTransparent: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="POS"
          component={POS}
          options={{
            headerShown: false,
            // title: "Bienvenue sur RHO POS",
            // headerStyle: { backgroundColor: "#111315" },
            // headerTitleStyle: {
            //   color: "#fff",
            // },
            // headerTintColor: "#fff", // Set the color of the back button

            // headerTransparent: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: "Panier",
            headerStyle: { backgroundColor: "#111315" },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#fff", // Set the color of the back button

            headerTransparent: true,
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
