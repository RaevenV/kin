import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const RegisterPage = () => {
  const { signUpWithEmail, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState("");
  const [dobDate, setDobDate] = useState(new Date());
  const router = useRouter();

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDob(formattedDate);
    }
  };

  const handleSignUp = async () => {
    if(!password.match(confirmPassword)){
      alert("Please make sure you have the same password!");
      return;
    }
    if (!name || !email || !password || !dob) {
      alert("Please fill in all fields");
      return;
    }
    const { error } = await signUpWithEmail(name,email, password,dob);
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
        <Text className="text-xl font-bold">kin</Text>
      </View>

      <ScrollView
        className="rounded-t-[60px] bg-white w-full h-full shadow-md p-8"
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View className=" w-full flex justify-start items-center mb-2">
          <Text className="text-xl font-bold">register</Text>
        </View>
        <TextInput
          className="bg-lightGray font-nunito font-medium rounded-lg p-4 w-full h-16 mb-2"
          placeholder="name"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          className="font-nunito font-medium bg-lightGray rounded-lg p-4 w-full h-16 mb-2"
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View className="bg-lightGray rounded-lg w-full h-16 flex justify-center items-center mb-2">
          <DateTimePicker
            value={dobDate}
            mode="date"
            display="default" // Options: 'default', 'spinner', 'calendar', 'clock'
            onChange={onDateChange}
            maximumDate={new Date()} // Prevents selecting future dates
          />
        </View>

        <TextInput
          className="bg-lightGray rounded-lg p-4 w-full h-16 mb-2"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          className="bg-lightGray rounded-lg p-4 w-full h-16 mb-2"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable
          className="bg-darkerBlue p-3 rounded-lg w-full h-14 flex justify-center items-center mt-8 mb-2"
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-white font-bold">Register</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 220,
    resizeMode: "contain",
    position:"absolute",
    top:110,
  },
});

