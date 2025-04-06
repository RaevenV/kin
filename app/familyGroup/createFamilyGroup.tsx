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
import { useUserData } from "@/hooks/useUserDataContext";
import { useAuth } from "@/hooks/useAuthContext";

const CreateFamilyGroupPage = () => {
  const router = useRouter();
  const { loading, createFamilyGroup } = useUserData();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const {userData} = useAuth();

  const handleCreate = async () => {
    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("Please enter a group name.");
      return;
    }

    if(!userData){
      setError("User data still empty");
      return;
    }

    const result = await createFamilyGroup(name.trim(), userData.id);
    
    if (result) {
      setError(result);
    } else {
      setSuccess(true);
      setName("");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-10 bg-cream gap-y-4">
      <Text className="text-2xl font-semibold">Create a Family Group</Text>

      <TextInput
        placeholder="Enter family group name"
        value={name}
        onChangeText={setName}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mb-2"
      />

      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      {success && (
        <Text className="text-green-600 mb-2">Family group created!</Text>
      )}

      <Pressable
        onPress={handleCreate}
        disabled={loading}
        className={`w-full bg-blue rounded-xl py-3 items-center ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">
            Create Group
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default CreateFamilyGroupPage;
