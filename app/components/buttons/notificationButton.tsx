import { Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const NotificationButton = () => {
  return (
    <Pressable className="bg-pink w-10 h-10 rounded-full flex items-center justify-center">
      <Feather name="bell" size={20} color="white" />
    </Pressable>
  );
};

export default NotificationButton;
