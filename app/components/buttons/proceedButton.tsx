import { Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProceedButton = () => {
  return (
    <Pressable className=" bg-lightGreen w-10 h-10 rounded-full flex items-center justify-center">
      <AntDesign name="arrowright" size={20} color="white" />
    </Pressable>
  );
};

export default ProceedButton;
