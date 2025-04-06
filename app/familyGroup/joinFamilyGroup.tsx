import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuthContext";
import { useUserData } from "@/hooks/useUserDataContext";

const JoinFamilyGroupPage = () => {
  const router = useRouter();
  const { loading, joinFamilyGroup } = useUserData();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useAuth();
  const [familyCode, setFamilyCode] = useState("");

  const handleJoin = async () => {
    setError(null);
    setSuccess(false);

    if (!familyCode.trim()) {
      setError("Please enter an invitation code.");
      return;
    }

    if (!userData) {
      setError("User data still empty");
      return;
    }

    const result = await joinFamilyGroup(familyCode.trim(), userData.id);

    if (result) {
      setError(result);
    } else {
      setSuccess(true);
      setFamilyCode("");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-10 bg-cream gap-y-4">
      <Text className="text-2xl font-semibold text-center">
        Join a Family Group
      </Text>

      <TextInput
        placeholder="Enter family code"
        value={familyCode}
        onChangeText={setFamilyCode}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mb-2"
        autoCapitalize="none"
      />

      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      {success && (
        <Text className="text-green-600 mb-2">Successfully joined group!</Text>
      )}

      <Pressable
        onPress={handleJoin}
        disabled={loading}
        className={`w-full bg-blue rounded-xl py-3 items-center ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Join Group</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default JoinFamilyGroupPage;
