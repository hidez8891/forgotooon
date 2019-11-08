import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from "./Context";
import ScreenRouter from "./ScreenRouter";

export default function App() {
  const [isReady, setReady] = useState<Boolean>(false);

  async function NativeBaseInitialize() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    setReady(true);
  }

  useEffect(() => {
    if (!isReady) {
      NativeBaseInitialize();
    }
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ScreenRouter />
      </StoreProvider>
    </SafeAreaProvider>
  );
}