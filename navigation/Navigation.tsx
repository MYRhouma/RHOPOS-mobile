import EnterPIN from "../components/screens/EnterPIN";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import POS from "../components/screens/POS";
import Cart from "../components/screens/Cart";
import Table from "../components/screens/Table";
import Login from "../components/screens/Login";
import CreatePIN from "../components/screens/CreatePIN";
import CreatePINverif from "../components/screens/CreatePINverif";
import Splash from "../components/screens/Splash";
import { config } from "../themes";
import { AuthContext } from "../components/auth/Authentication";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const {
    isLoading,
    accessToken,
    refreshToken,
    pinCode,
    skipEnterPIN,
    isPinValid,
  } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ borderRadius: 40 }}
          source={require("../assets/192.png")}
        />
        <Text style={{ fontWeight: "200", fontSize: 20, marginTop: 10 }}>
          Bienvenue sur RHO POS
        </Text>
        <StatusBar style="dark" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
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
            headerStyle: { backgroundColor: config.themeDark.color.white },
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="CreatePINverif"
          component={CreatePINverif}
          options={{
            title: "", //no title
            headerStyle: { backgroundColor: config.themeDark.color.white },
            headerTransparent: true,
          }}
        /> */}
        {accessToken &&
        refreshToken &&
        pinCode &&
        skipEnterPIN === false &&
        !isPinValid ? (
          <Stack.Screen
            name="EnterPIN"
            component={EnterPIN}
            options={{
              title: "", //no title
              headerStyle: { backgroundColor: config.themeDark.color.white },
              headerTransparent: true,
            }}
          />
        ) : accessToken && refreshToken && !pinCode ? (
          <>
            <Stack.Screen
              name="CreatePIN"
              component={CreatePIN}
              options={{
                title: "", //no title
                headerStyle: { backgroundColor: config.themeDark.color.white },
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="CreatePINverif"
              component={CreatePINverif}
              options={{
                title: "", //no title
                headerStyle: { backgroundColor: config.themeDark.color.white },
                headerTransparent: true,
              }}
            />
          </>
        ) : !accessToken || !refreshToken ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="POS"
              component={POS}
              options={{
                headerShown: false,
                // title: "Bienvenue sur RHO POS",
                // headerStyle: { backgroundColor: "#111315" },
                // headerTitleStyle: {
                //   color: config.themeDark.color.white,
                // },
                // headerTintColor: config.themeDark.color.white, // Set the color of the back button

                // headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                // headerShown: false,
                title: "Panier",
                headerStyle: { backgroundColor: config.themeDark.color.black },
                headerTitleStyle: {
                  color: config.themeDark.color.white,
                },
                headerBackTitle: "",
                headerTintColor: config.themeDark.color.white, // Set the color of the back button

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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
