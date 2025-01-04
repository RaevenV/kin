import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#10101E",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Login", headerShown: true }}
      />
    </Stack>
  );
};

export default StackLayout;
