import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getToken = (navigation) => {
  useEffect(() => {
    // Pop the last screen from the stack
    navigation.pop();

    // Replace the screen beneath it with the new screen
    navigation.replace("POS", { authentication });
    const localStorage = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!(accessToken && refreshToken)) {
          navigation.popToTop();
          navigation.replace("Login");
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    localStorage();

    // navigation.navigate("CreatePINverif", { authentication, buffer });
  }, []);
};
