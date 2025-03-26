import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const RegisterPage = () => {
  const { signUpWithEmail, loading, userData, refreshUserData } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [dobDate, setDobDate] = useState(new Date());
  const [expanded, setExpanded] = useState(false);
  const expandAnimation = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDob(formattedDate);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Please make sure you have the same password!");
      return;
    }
    if (!name || !email || !password || !dob) {
      alert("Please fill in all fields");
      return;
    }

    const errorMessage = await signUpWithEmail(name, email, password, dob);
    if (errorMessage) {
      Alert.alert("Error", errorMessage);
      return;
    }

    if (!userData) {
      await refreshUserData();
    }

    Alert.alert("Success", "Registration successful!", [
      { text: "OK", onPress: () => router.push("/(tabs)/home") },
    ]);
  };

  const navigateToLogin = () => {
    router.push("/");
  };

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(expandAnimation, {
      toValue,
      useNativeDriver: false,
      friction: 8,
    }).start();
    setExpanded(!expanded);
  };

  const formHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["68%", "90%"],
  });

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="relative h-full flex flex-col justify-start items-center"
    >
      <Image
        style={styles.image}
        source={require("../assets/images/pink-green-blue.svg")}
        contentFit="contain"
      />
      <View className="w-full flex-1">
        <View className="h-60 pt-4 w-full flex justify-start items-center">
          <Text className="text-xl font-bold">kin</Text>
        </View>
      </View>

      <Animated.View style={[styles.formContainer, { height: formHeight }]}>
        <Pressable style={styles.dragHandle} onPress={toggleExpand}>
          <View style={styles.dragIndicator} />
        </Pressable>

        <ScrollView
          className="w-full px-8"
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: 40,
          }}
        >
          <View className="w-full flex justify-start items-center mb-6 mt-4">
            <Text className="text-xl font-bold">register</Text>
          </View>

          <TextInput
            className="bg-lightGray font-nunito font-medium rounded-lg p-4 w-full h-16 mb-4"
            placeholder="name"
            autoCapitalize="none"
            value={name}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setName}
          />

          <TextInput
            className="font-nunito font-medium bg-lightGray rounded-lg p-4 w-full h-16 mb-4"
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setEmail}
          />

          <View className="bg-lightGray rounded-lg w-full h-16 flex justify-center items-center mb-4">
            <DateTimePicker
              value={dobDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          </View>

          <TextInput
            className="bg-lightGray rounded-lg p-4 w-full h-16 mb-4"
            placeholder="Password"
            secureTextEntry
            value={password}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setPassword}
          />

          <TextInput
            className="bg-lightGray rounded-lg p-4 w-full h-16 mb-4"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            className="bg-darkerBlue p-3 rounded-lg w-full h-14 flex justify-center items-center mt-2"
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="text-white font-bold">Register</Text>
          </Pressable>

          <View className="w-full flex justify-center items-center mt-4 mb-4">
            <Text>or</Text>
          </View>

          <Pressable
            className="bg-lightGray p-3 rounded-lg w-full h-14 flex justify-center items-center mb-6"
            // onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="text-black font-medium">Sign in with google</Text>
          </Pressable>

          <TouchableOpacity onPress={navigateToLogin} className="mb-8">
            <Text className="text-darkerBlue font-medium">
              Already have an account? <Text className="font-bold">Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 220,
    resizeMode: "contain",
    position: "absolute",
    top: 120,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },
  dragHandle: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#CCCCCC",
    borderRadius: 2,
  },
});
