import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useAuth } from "@/hooks/useAuthContext";
import { useRouter } from "expo-router";
import { Ionicons} from "@expo/vector-icons";
import * as Progress from "react-native-progress";

interface TabIconProps {
  icon: any | null;
  focused: boolean | null;
}

const ProfilePage = () => {
  const { userData, signOut } = useAuth();
  //nanti router bisa dibikin lebi efisien manggilny
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const TabIcon = ({ icon, focused }: TabIconProps) => {
    return (
      <View className="items-center flex flex-col justify-center gap-2">
        <Ionicons
          color={focused ? "#77AAFF" : "#8f8989"}
          size={24}
          name={icon}
        />
      </View>
    );
  };

  return (
    <ScrollView
      className="flex-1 overflow-hidden bg-cream"
      contentContainerClassName="flex-grow"
      alwaysBounceVertical={true}
      showsVerticalScrollIndicator={false}
      overScrollMode="always"
    >
      <View className="bg-cyan flex justify-center items-center flex-col relative pt-36 rounded-b-[60px]">
        <View className="absolute top-14 right-8 bg-white rounded-full w-10 h-10 flex justify-center items-center">
          <Ionicons name="settings-outline" size={18} color="#292A26" />
        </View>

        <View className="absolute top-14 flex justify-start items-center flex-col gap-y-1">
          <Text className="font-rubik-bold font-bold text-[16px] text-black">
            {userData?.name}
          </Text>
          <Text className="font-nunito-bold font-medium text-[14px] text-black">
            Son
          </Text>
        </View>

        {/* Image with lower z-index */}
        <Image
          style={styles.image}
          source={require("../../assets/images/purple.svg")}
          contentFit="contain"
        />
      </View>

      {/* userdata section */}
      <View className="z-20 w-full px-8 h-40 mt-[-90px] mb-4">
        {/* <Pressable
          onPress={handleSignOut}
          className="w-full bg-red-500 p-4 rounded-xl h-14 flex justify-center items-center"
        >
          <Text className="text-white font-nunito-bold font-bold">
            Sign Out
          </Text>
        </Pressable> */}
        <View className="h-full w-full rounded-3xl p-8 justify-start items-center gap-y-4 bg-white shadow-sm">
          <Progress.Bar color="#77AAFF" progress={0.3} width={240} />
        </View>
      </View>

      {/* Bottom section with 4 equal width cards that wrap */}
      <View className="w-full h-auto px-8">
        <View style={styles.cardContainer} className="gap-y-4">
          <View className="bg-white w-[48%] h-40 rounded-xl shadow-sm"></View>
          <View className="bg-white w-[48%] h-40 rounded-xl shadow-sm"></View>
          <View className="bg-white w-[48%] h-40 rounded-xl shadow-sm"></View>
          <View className="bg-white w-[48%] h-40 rounded-xl shadow-sm"></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 220,
    resizeMode: "contain",
    zIndex: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
});