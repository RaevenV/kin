import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import useCustomFonts from "@/assets/fonts/fontExport";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationButton from "../components/buttons/notificationButton";
import ProceedButton from "../components/buttons/proceedButton";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

const Home = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  //basically kea everytime the page updates dia check, thats use effect!!
  useEffect(() => {
    const loadFonts = async () => {
      await useCustomFonts();
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // buat loading
  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#E46F43" />
      </View>
    );
  }

  return (
    <SafeAreaView className="px-[16px] pt-[6px] h-full bg-cream w-full flex flex-col justify-start items-start">
      {/* Top Bar */}
      <View className="flex flex-row justify-between items-center w-full h-12 mb-2 ">
        <Text className="text-[20px] font-rubik-bold font-extrabold text-black">
          Hi Raeven 👋
        </Text>
        <NotificationButton />
      </View>

      {/* credits box */}
      <View className="flex flex-row justify-end items-start w-full mb-4">
        <View className="bg-pink rounded-full h-12 flex justify-center items-start w-32 px-6">
          <Text className="text-white font-nunito-bold font-bold text-[12px]">
            $ 44
          </Text>
        </View>
      </View>

      {/* daily question box */}
      <View className="mb-4 bg-white w-full h-48 rounded-[40] shadow-sm p-8 flex justify-start items-start gap-y-2">
        <Text className="text-darkerBlue text-[10px] font-nunito-bold font-bold">
          Daily Questions!
        </Text>

        {/* the question */}
        <Text className="text-darkerBlue text-[14px] font-rubik-bold font-bold">
          What’s one thing you wish your parents knew about?
        </Text>

        {/* points */}
        <Text className="text-pink text-[12px] font-nunito-bold font-bold">
          12 points
        </Text>

        <View className="mt-2 w-full flex justify-center items-end">
          <ProceedButton />
        </View>
      </View>

      {/* streak */}
      <View className="relative w-full h-64 shadow-sm">
        {/* Shadow Wrapper */}
        <View className="bg-white w-full p-8 h-full rounded-[40]  overflow-hidden">
          <Text className="text-lightGreen font-nunito-bold font-extrabold w-[40%] text-[16px] mb-2">
            Your streak is ending!
          </Text>

          <View className="absolute bottom-[-100px] left-0">
            <Image
              style={styles.image}
              source={require("../../assets/images/sad-pink.png")}
              contentFit="contain"
            />
          </View>

          <View className="flex-col absolute bottom-16 right-12 justify-center items-center">
            <Text className="text-blue text-[80px] font-rubik-bold font-extrabold">4</Text>
            <Text className="text-blue text-[16px] mb-2 ml-1 font-nunito-bold font-bold">days</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;


const styles = StyleSheet.create({
  image: {
    width: 240,
    height: 220,
    resizeMode: "contain",
  },
});
