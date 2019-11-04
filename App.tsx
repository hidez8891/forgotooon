import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from "./Context";
import ScreenRouter from "./ScreenRouter";

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ScreenRouter />
      </StoreProvider>
    </SafeAreaProvider>
  );
}