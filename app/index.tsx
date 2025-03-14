import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";


const LoginPage = () => {
  const { signInWithEmail, loading } = useAuth();
  //nanti dlu namenya
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const { error } = await signInWithEmail(email, password);

    if (error) {
      Alert.alert("Error", error.message);
      console.error("Login failed:", error);
    } else {
      Alert.alert("Success", "Login successful!");
      router.push("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="relative h-full flex flex-col justify-start items-center gap-y-4"
    >
      <Image
        style={styles.image}
        source={require("../assets/images/dadMomKid.svg")}
        contentFit="contain"
      />
      <View className="h-60 pt-4 w-full flex justify-start items-center">
        {/* logo */}
        <Text className="text-xl font-bold">kin</Text>
      </View>

      <View
        className="flex justify-start items-center rounded-t-[60px] bg-white w-full h-full shadow-md p-8"
      >
        <View className=" w-full flex justify-start items-center mb-2">
          <Text className="text-xl font-bold">login</Text>
        </View>

        <TextInput
          className="font-nunito font-medium bg-lightGray rounded-lg p-4 w-full h-16 mb-2"
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="bg-lightGray rounded-lg p-4 w-full h-16 mb-2"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <Pressable
          className="bg-darkerBlue p-3 rounded-lg w-full h-14 flex justify-center items-center mt-8 mb-2"
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text className="text-white font-bold">Login</Text>
        </Pressable>

        <View className="w-full flex justify-center items-center">
          <Text>or</Text>
        </View>

        <Pressable
          className="bg-lightGray p-3 rounded-lg w-full h-14 flex justify-center items-center mt-2 mb-16"
          // onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-black font-medium">Sign in with google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 220,
    resizeMode: "contain",
    position: "absolute",
    top: 110,
  },
});
