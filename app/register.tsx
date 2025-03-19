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
  const { signUpWithEmail, loading } = useAuth();
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

    try {
      await signUpWithEmail(name, email, password, dob);
      Alert.alert("Success", "Login successful!");
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "Login failed from the backend")
    }
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
      className="relative flex flex-col items-center justify-start h-full"
    >
      <Image
        style={styles.image}
        source={require("../assets/images/pink-green-blue.svg")}
        contentFit="contain"
      />
      <View className="flex-1 w-full">
        <View className="flex items-center justify-start w-full pt-4 h-60">
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
          <View className="flex items-center justify-start w-full mt-4 mb-6">
            <Text className="text-xl font-bold">register</Text>
          </View>

          <TextInput
            className="w-full h-16 p-4 mb-4 font-medium rounded-lg bg-lightGray font-nunito"
            placeholder="name"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            className="w-full h-16 p-4 mb-4 font-medium rounded-lg font-nunito bg-lightGray"
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <View className="flex items-center justify-center w-full h-16 mb-4 rounded-lg bg-lightGray">
            <DateTimePicker
              value={dobDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          </View>

          <TextInput
            className="w-full h-16 p-4 mb-4 rounded-lg bg-lightGray"
            placeholder="Password"
            secureTextEntry
            textContentType="none"
            autoComplete="off"
            importantForAutofill="no"
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            className="w-full h-16 p-4 mb-4 rounded-lg bg-lightGray"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="none"
            autoComplete="off"
            importantForAutofill="no"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            className="flex items-center justify-center w-full p-3 mt-2 rounded-lg bg-darkerBlue h-14"
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="font-bold text-white">Register</Text>
          </Pressable>

          <View className="flex items-center justify-center w-full mt-4 mb-4">
            <Text>or</Text>
          </View>

          <Pressable
            className="flex items-center justify-center w-full p-3 mb-6 rounded-lg bg-lightGray h-14"
            // onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="font-medium text-black">Sign in with google</Text>
          </Pressable>

          <TouchableOpacity onPress={navigateToLogin} className="mb-8">
            <Text className="font-medium text-darkerBlue">
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
