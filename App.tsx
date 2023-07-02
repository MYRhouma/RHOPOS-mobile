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
import { config } from "./themes";
import { AuthProvider } from "./components/auth/Authentication";
import Navigation from "./navigation/Navigation";

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
