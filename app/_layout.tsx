import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/hooks/useAuthContext";
import { UserDataProvider } from "@/hooks/useUserDataContext";

const StackLayout = () => {
  return (
    <AuthProvider>
      <UserDataProvider>
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
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen
            name="familyGroup/familyGroupCheck"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="familyGroup/joinFamilyGroup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="familyGroup/createFamilyGroup"
            options={{ headerShown: false }}
          />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </UserDataProvider>
    </AuthProvider>
  );
};

export default StackLayout;
