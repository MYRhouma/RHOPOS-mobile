import EnterPIN from "./components/screens/EnterPIN";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import POS from "./components/screens/POS";
import Cart from "./components/screens/Cart";
import Table from "./components/screens/Table";
import Login from "./components/screens/Login";
import CreatePIN from "./components/screens/CreatePIN";
import CreatePINverif from "./components/screens/CreatePINverif";
import Splash from "./components/screens/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreatePIN"
          component={CreatePIN}
          options={{
            title: "", //no title
            headerStyle: { backgroundColor: "#fff" },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="CreatePINverif"
          component={CreatePINverif}
          options={{
            title: "", //no title
            headerStyle: { backgroundColor: "#fff" },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="EnterPIN"
          component={EnterPIN}
          options={{
            title: "", //no title
            headerStyle: { backgroundColor: "#fff" },
            headerTransparent: true,
          }}
        />

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
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            // headerShown: false,
            title: "Panier",
            headerStyle: { backgroundColor: "#111315" },
            headerTitleStyle: {
              color: "#fff",
            },
            headerBackTitle: "",
            headerTintColor: "#fff", // Set the color of the back button

            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Table"
          component={Table}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
