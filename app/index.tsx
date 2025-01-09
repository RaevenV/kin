import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuthContext";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isSignUp, setIsSignUp] = useState(false);

  // const { login, signup, loading } = useAuth();
  // return (
  //   <ScrollView
  //     className="bg-bgWhite"
  //     keyboardShouldPersistTaps="handled"
  //   >
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === "ios" ? "padding" : "height"}
  //       className="gap-y-4 px-8 min-h-full w-full flex flex-col justify-center items-center"
  //     >
  //       <Text className="font-extrabold text-orange italic text-[24px] mb-6">
  //         {isSignUp ? "Create Account" : "Welcome Back"}
  //       </Text>

  //       <View className="w-full mb-4">
  //         <Text className="text-gray-600 mb-2">Email</Text>
  //         <TextInput
  //           className="border border-gray-300 rounded-md p-3 bg-white"
  //           placeholder="Enter your email"
  //           autoCapitalize="none"
  //           value={email}
  //           onChangeText={(text) => setEmail(text)}
  //           keyboardType="email-address"
  //         />
  //       </View>

  //       <View className="w-full mb-4">
  //         <Text className="text-gray-600 mb-2">Password</Text>
  //         <TextInput
  //           className="border border-gray-300 rounded-md p-3 bg-white"
  //           placeholder="Enter your password"
  //           autoCapitalize="none"
  //           value={password}
  //           secureTextEntry={true}
  //           onChangeText={(text) => setPassword(text)}
  //         />
  //       </View>

  //       {loading ? (
  //         <ActivityIndicator size="large" color="#E46F43" />
  //       ) : (
  //         <TouchableOpacity
  //           className="w-full bg-orange rounded-md p-4 items-center mb-4"
  //           onPress={handleAuth}
  //         >
  //           <Text className="text-white font-bold">
  //             {isSignUp ? "Sign Up" : "Log In"}
  //           </Text>
  //         </TouchableOpacity>
  //       )}

  //       <TouchableOpacity
  //         onPress={toggleAuthMode}
  //         className="mt-4"
  //       >
  //         <Text className="text-orange">
  //           {isSignUp
  //             ? "Already have an account? Log In"
  //             : "Don't have an account? Sign Up"}
  //         </Text>
  //       </TouchableOpacity>
  //     </KeyboardAvoidingView>
  //   </ScrollView>
  // );

  //CONTOH PENGGUNAAN PROVIDER & CONTEXT
    const { test } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      
      <Text>{test()}</Text>


      <Link href="/register" asChild>
        <Pressable>
          <Text className="text-red-500">Regis</Text>
        </Pressable>
      </Link>

      <Link className="mt-4" href="/(tabs)/home" asChild>
        <Pressable>
          <Text className="text-red-500">Home</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default LoginPage;
