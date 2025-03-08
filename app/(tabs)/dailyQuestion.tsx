import { Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const DailyQuestionPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 "
        contentContainerClassName="px-[16px] pt-[18px] pb-[40px]"
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        bounces={true}
        overScrollMode="always"
      >
        <Text>Daily Questions</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyQuestionPage;
