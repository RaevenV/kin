import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const DailyQuestion = () => {
  return (
    <SafeAreaView className="px-[16px] pt-[6px] h-full bg-cream w-full flex flex-col justify-start items-start">
        <Text>Daily Question</Text>
    </SafeAreaView>
  );
};

export default DailyQuestion;
