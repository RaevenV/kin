import {
  StyleSheet,
  View,
  Text,
  Pressable
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const familyGroupCheckPage = () => {
  const router = useRouter();

  const navigateToJoinFamilyGroup = () => {
    router.push("familyGroup/joinFamilyGroup");
  };

  const navigateToCreateFamilyGroup = () => {
    router.push("familyGroup/createFamilyGroup");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="relative h-full flex flex-col justify-center items-center px-10 gap-y-8"
    >
      <Image
        style={styles.image}
        source={require("../../assets/images/green-questioning.svg")}
        contentFit="contain"
      />

      <Pressable
        onPress={navigateToJoinFamilyGroup}
        className="rounded-3xl bg-white shadow-sm w-full h-40 flex justify-center items-center"
      >
        <Text className="font-nunito-bold font-bold text-[16px]">
          Join an existing family group
        </Text>
      </Pressable>
      <Pressable
        onPress={navigateToCreateFamilyGroup}
        className="rounded-3xl bg-white shadow-sm w-full h-40 flex justify-center items-center"
      >
        <Text className="font-nunito-bold font-bold text-[16px]">
          Create a family group
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default familyGroupCheckPage;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    position: "absolute",
    top: 20,
    height: 900,
    width: 850,
  },
});
