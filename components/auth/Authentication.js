import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [isPinValid, setIsPinValid] = useState(false);
  const [skipEnterPIN, setSkipEnterPIN] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post("https://rhopos.live/auth/jwt/create", {
        email: email.toLowerCase(),
        password: password,
      })
      .then((res) => {
        let userInfo = res.data;
        setAccessToken(userInfo.access);
        setRefreshToken(userInfo.refresh);
        setPinCode("");
        AsyncStorage.setItem("accessToken", userInfo.access);
        AsyncStorage.setItem("refreshToken", userInfo.refresh);
        AsyncStorage.removeItem("pinCode");

        console.log(userInfo);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);

    setAccessToken("");
    setRefreshToken("");
    setPinCode("");
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("pinCode");

    setIsLoading(false);
  };

  const CreatePIN = (pin) => {
    setIsLoading(true);
    setPinCode(pin);
    AsyncStorage.setItem("pinCode", pin);
    setSkipEnterPIN(true);

    setIsLoading(false);
  };

  const CheckPIN = (pin) => {
    if (pin === pinCode) setIsPinValid(true);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      setAccessToken(accessToken);
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      setRefreshToken(refreshToken);
      const pinCode = await AsyncStorage.getItem("pinCode");
      setPinCode(pinCode);
    } catch (e) {
      console.log("isLoggedIn ERROR : ", e);
    }
    setIsLoading(false);
  };

  const generateNewAccessToken = (refreshToken) => {
    axios
      .post("https://rhopos.live/auth/jwt/refresh", {
        refresh: refreshToken,
      })
      .then((res) => {
        let data = res.data;
        setAccessToken(data.access);
        console.log("REFRESHED !!! AT : ", data.access);
        AsyncStorage.setItem("accessToken", data.access);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const grabData = () => {
    const netInfo = useNetInfo();
    if (netInfo.isConnected) {
    }
  };
  // const getAccessToken = () => {
  //   return accessToken;
  // };
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        accessToken,
        refreshToken,
        CreatePIN,
        pinCode,
        CheckPIN,
        skipEnterPIN,
        isPinValid,
        generateNewAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
