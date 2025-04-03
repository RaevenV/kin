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
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const RegisterPage = () => {
  const { signUpWithEmail, loading, userData, refreshUserData } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const [dobText, setDobText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandAnimation = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // Custom date picker state
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const toggleDatepicker = () => {
    if (!showPicker) {
      // Set current values when opening
      setDay(date.getDate());
      setMonth(date.getMonth() + 1);
      setYear(date.getFullYear());
    }
    setShowPicker(!showPicker);
  };

  const formatDate = (day: number, month: number, year: number): string => {
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const confirmDate = () => {
    // Validate date
    const maxDay = new Date(year, month, 0).getDate();
    const validDay = Math.min(Math.max(1, day), maxDay);

    // Create new date and format
    const newDate = new Date(year, month - 1, validDay);
    setDate(newDate);
    setDobText(formatDate(validDay, month, year));
    toggleDatepicker();
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Please make sure you have the same password!");
      return;
    }
    if (!name || !email || !password || !dobText) {
      alert("Please fill in all fields");
      return;
    }

    const errorMessage = await signUpWithEmail(
      name,
      email,
      password,
      date.toISOString()
    );
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const renderPickerItems = (
    items: number[],
    selectedValue: number,
    onValueChange: (value: number) => void
  ) => {
    return (
      <ScrollView className="flex-1 px-2">
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            className={`p-3 rounded-lg ${
              selectedValue === item ? "bg-darkerBlue" : "bg-lightGray"
            } my-1`}
            onPress={() => onValueChange(item)}
          >
            <Text
              className={`text-center ${
                selectedValue === item ? "text-white font-bold" : "text-black"
              }`}
            >
              {item < 10 ? `0${item}` : item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

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
            className="bg-lightGray font-nunito font-medium rounded-2xl p-4 w-full h-16 mb-4"
            placeholder="Name"
            autoCapitalize="none"
            value={name}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setName}
          />

          <TextInput
            className="font-nunito font-medium bg-lightGray rounded-2xl p-4 w-full h-16 mb-4"
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setEmail}
          />

          <Pressable
            onPress={toggleDatepicker}
            className="bg-lightGray rounded-2xl w-full h-16 mb-4 justify-center"
          >
            <Text className="text-gray-400 font-nunito font-medium px-4">
              {dobText || "Choose date of birth"}
            </Text>
          </Pressable>

          {/* Custom Date Picker Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicker}
            onRequestClose={toggleDatepicker}
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-white rounded-t-3xl p-5">
                <Text className="text-center text-lg font-bold mb-4">
                  Select Date of Birth
                </Text>

                <View className="flex-row justify-between mb-6 h-64">
                  {/* Day picker */}
                  <View className="flex-1">
                    <Text className="text-center mb-2 font-medium">Day</Text>
                    {renderPickerItems(days, day, setDay)}
                  </View>

                  {/* Month picker */}
                  <View className="flex-1">
                    <Text className="text-center mb-2 font-medium">Month</Text>
                    {renderPickerItems(months, month, setMonth)}
                  </View>

                  {/* Year picker */}
                  <View className="flex-1">
                    <Text className="text-center mb-2 font-medium">Year</Text>
                    {renderPickerItems(years, year, setYear)}
                  </View>
                </View>

                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className="bg-gray-200 p-3 rounded-xl flex-1 mr-2"
                    onPress={toggleDatepicker}
                  >
                    <Text className="text-center font-medium">Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-darkerBlue p-3 rounded-xl flex-1 ml-2"
                    onPress={confirmDate}
                  >
                    <Text className="text-white text-center font-medium">
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TextInput
            className="bg-lightGray font-nunito font-medium rounded-2xl p-4 w-full h-16 mb-4"
            placeholder="Password"
            secureTextEntry
            value={password}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setPassword}
          />

          <TextInput
            className="bg-lightGray font-nunito font-medium rounded-2xl p-4 w-full h-16 mb-4"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            className="bg-darkerBlue p-3 rounded-xl w-full h-14 flex justify-center items-center mt-2"
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="text-white font-bold">Register</Text>
          </Pressable>

          <View className="w-full flex justify-center items-center mt-4 mb-4">
            <Text>or</Text>
          </View>

          <Pressable
            className="bg-lightGray p-3 rounded-xl w-full h-14 flex justify-center items-center mb-6"
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
    width: 220,
    height: 250,
    resizeMode: "contain",
    position: "absolute",
    top: 60,
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
