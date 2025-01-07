import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const register = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/" asChild>
        <Pressable>
          <Text className="text-blue">Regis</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default register;
