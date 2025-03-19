import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const LoginPage = () => {
  const { signInWithEmail, loading, userData, session, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const router = useRouter();

  //template check sesh
  useEffect(() => {
    if (session || userData) {
      console.log("User already logged in, redirecting to home...");
      router.replace("/(tabs)/home"); // Use replace to avoid adding to navigation stack
    }
    setInitialCheckDone(true); // Mark initial check as complete
  }, [session, userData, router]);

  console.log("LoginPage auth state:", { session, userData, loading });

  // Wait for loading to complete before rendering or redirecting
  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Optionally, render a loading state until the check is done
  if (!initialCheckDone) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const errorMessage = await signInWithEmail(email, password);
      if (errorMessage) {
        Alert.alert("Error", errorMessage);
        return;
      }

      console.log("Session after login:", session);
      console.log("UserData after login:", userData);

      Alert.alert("Success", "Login successful!");
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "Login failed from the backend");
    }
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="relative flex flex-col items-center justify-start h-full gap-y-4"
    >
      <Image
        style={styles.image}
        source={require("../assets/images/pink-blue-green.svg")}
        contentFit="contain"
      />
      <View className="h-[270px] pt-4 w-full flex justify-start items-center">
        {/* logo */}
        <Text className="text-xl font-bold">kin</Text>
      </View>

      <View className="flex justify-start items-center rounded-t-[60px] bg-white w-full flex-grow shadow-md p-8">
        <View className="flex items-center justify-start w-full mb-6 ">
          <Text className="text-xl font-bold">login</Text>
        </View>

        <TextInput
          className="w-full h-16 p-4 mb-4 font-medium rounded-lg bg-lightGray font-nunito"
          placeholder="Email"
          autoCapitalize="none"
          textContentType="none"
          autoComplete="off"
          importantForAutofill="no"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="w-full h-16 p-4 mb-4 font-medium rounded-lg bg-lightGray font-nunito"
          placeholder="Password"
          secureTextEntry
          textContentType="none"
          autoComplete="off"
          importantForAutofill="no"
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          className="flex items-center justify-center w-full p-3 mt-8 mb-2 rounded-lg bg-darkerBlue h-14"
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text className="font-bold text-white">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        <View className="flex items-center justify-center w-full">
          <Text>or</Text>
        </View>

        <Pressable
          className="flex items-center justify-center w-full p-3 mt-2 mb-6 rounded-lg bg-lightGray h-14"
          // onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="font-medium text-black">Sign in with google</Text>
        </Pressable>

        <TouchableOpacity onPress={navigateToRegister} className="mt-4">
          <Text className="font-medium text-darkerBlue">
            Don't have an account? <Text className="font-bold">Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 250,
    resizeMode: "contain",
    position: "absolute",
    top: 130,
  },
});
