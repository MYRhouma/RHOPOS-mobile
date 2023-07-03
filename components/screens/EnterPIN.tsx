import React, { useState, useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  useColorScheme,
  Vibration,
  TouchableOpacity,
  Text,
} from "react-native";
import { Delete, XSquare } from "@tamagui/lucide-icons";
import {
  H3,
  Spacer,
  TamaguiProvider,
  Theme,
  YStack,
  XStack,
  Button,
} from "tamagui";
import KeypadNumber from "../code-view/KeypadNumber";
import config from "../../tamagui.config";
import ShakeAnimation from "../code-view/AnimatedDots";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { AuthContext } from "../auth/Authentication";

export default function EnterPIN({ navigation }) {
  // let route = useRoute();
  // let authentication = route.params.authentication;
  const { logout, pinCode, CheckPIN } = useContext(AuthContext);

  const [buffer, setBuffer] = useState("");
  const [is_invalid, setInvalid] = useState(true);
  useEffect(() => {
    console.log(pinCode);
    if (buffer.length >= 4) {
      if (buffer === pinCode) {
        setTimeout(() => {
          CheckPIN(buffer);
        }, 150);
      } else {
        setInvalid(false);
        setTimeout(() => {
          setBuffer("");
          setInvalid(true);
        }, 150);
      }
    }
  }, [buffer]);

  const handleKeyPress = (key: string) => {
    if (buffer.length < 4) {
      setBuffer(buffer + key);
    }

    // if (buffer + key === PIN) {
    //   setTimeout(() => {
    //     // navigation.navigate("POS");
    //     navigation.replace("POS", { authentication });
    //     setBuffer("");
    //   }, 300);
    // }
  };

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack
          space
          f={1}
          jc="center"
          ai="center"
          // backgroundColor={"$backgroundSoft"}
          backgroundColor={"#fff"}
        >
          <H3>Entrez votre PIN</H3>

          <ShakeAnimation isIncorrect={is_invalid} buffer={buffer} />
          <Spacer />
          <YStack space ai="center" jc="center">
            <XStack space>
              <KeypadNumber content="1" onPress={() => handleKeyPress("1")} />
              <KeypadNumber content="2" onPress={() => handleKeyPress("2")} />
              <KeypadNumber content="3" onPress={() => handleKeyPress("3")} />
            </XStack>
            <XStack space>
              <KeypadNumber content="4" onPress={() => handleKeyPress("4")} />
              <KeypadNumber content="5" onPress={() => handleKeyPress("5")} />
              <KeypadNumber content="6" onPress={() => handleKeyPress("6")} />
            </XStack>
            <XStack space>
              <KeypadNumber content="7" onPress={() => handleKeyPress("7")} />
              <KeypadNumber content="8" onPress={() => handleKeyPress("8")} />
              <KeypadNumber content="9" onPress={() => handleKeyPress("9")} />
            </XStack>
            <XStack space>
              <Button
                onPress={() => setBuffer("")}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "transparent",
                }}
                icon={<XSquare size="$3" />}
              />
              <KeypadNumber content="0" onPress={() => handleKeyPress("0")} />
              <Button
                onPress={() => setBuffer(buffer.slice(0, -1))}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "transparent",
                }}
                icon={<Delete size="$3" />}
              />
            </XStack>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                logout();
              }}
            >
              <Text>J'ai oublié mon code PIN</Text>
            </TouchableOpacity>
            {/* <XStack>
              <TouchableOpacity
                onPress={() =>
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  )
                }
              >
                <Text style={{ padding: 30 }}>T</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                  )
                }
              >
                <Text style={{ padding: 30 }}>T</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Warning
                  )
                }
              >
                <Text style={{ padding: 30 }}>T</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }
              >
                <Text style={{ padding: 30 }}>T</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }
              >
                <Text style={{ padding: 30 }}>T</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }
              >
                <Text style={{ padding: 30 }}>T</Text>
              </TouchableOpacity>
            </XStack> */}
          </YStack>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
