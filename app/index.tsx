import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const LoginPage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/register" asChild>
        <Pressable>
          <Text className="text-red-500">Hello World</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default LoginPage;
