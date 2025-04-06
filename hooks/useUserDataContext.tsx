import React from "react";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useState } from "react";
import {
  FamilyGroup,
  FamilyMember,
  FamilyGroupWithMembers,
} from "@/types/family";
import { supabase } from "@/lib/supabase";

interface UserDataContextType {
  updateUserProgress: () => Promise<string | null>;
  createFamilyGroup: (
    name: string,
    created_by: number
  ) => Promise<string | null>;
  joinFamilyGroup: (
    invitation_code: string,
    user_id: number
  ) => Promise<string | null>;
  loading: boolean;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

interface UserDataProviderProps {
  children: ReactNode;
}

export function UserDataProvider({ children }: UserDataProviderProps) {
  const [loading, setLoading] = useState(false);
  const [familyGroupData, setFamilyGroupData] = useState<FamilyGroup | null>(
    null
  );

  function generateInvitationCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

  async function updateUserProgress() {
    return "User progress updated";
  }

  async function createFamilyGroup(name: string, created_by: number) {
    const invitation_code = generateInvitationCode();

    try {
      setLoading(true);

      const { data: insertedGroup, error: insertError } = await supabase
        .from("family_groups")
        .insert([{ name, created_by, invitation_code }])
        .select("*")
        .single(); 

      if (insertError) {
        console.error("Error inserting family group:", insertError);
        setLoading(false);
        return insertError.message || "Failed to store family group";
      }

      const { error: insertError2 } = await supabase
        .from("family_members")
        .insert([{ group_id: insertedGroup.id, user_id: created_by }]);

      if (insertError2) {
        console.error("Error inserting family member:", insertError2);
        setLoading(false);
        return insertError2.message || "Failed to store family member";
      }

      setLoading(false);
      return null;
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      setLoading(false);
      return "An unexpected error occurred";
    }
  }

  async function joinFamilyGroup(invitation_code: string, user_id: number) {
    //cari dulu family groupnya ada ga
    if (!invitation_code) {
      setLoading(false);
      return "Invitation code is empty";
    }

    const normalizedCode = invitation_code.trim().toUpperCase();

    try {
      setLoading(true);
      const { data: familyGroupData, error: familyGroupError } = await supabase
        .from("family_groups")
        .select("*")
        .eq("invitation_code", normalizedCode)
        .maybeSingle();

      if (familyGroupError) {
        console.error("Error fetching familyGroup data:", familyGroupError);
        setLoading(false);
        return familyGroupError.message || "Error fetching family group";
      }

      if (!familyGroupData) {
        setLoading(false);
        return "No family group found with that invitation code";
      }
      
      //abis ketemu
      setFamilyGroupData(familyGroupData);

      //baru kita insert usernya
      const { error: insertError } = await supabase
        .from("family_members")
        .insert([{ group_id: familyGroupData.id, user_id }]);

      if (insertError) {
        console.error("Error inserting family member:", insertError);
        setLoading(false);
        return insertError.message || "Failed to store family member";
      }

      setLoading(false);
      return null;
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      setLoading(false);
      return "An unexpected error occurred";
    }
  }

  return (
    <UserDataContext.Provider
      value={{
        updateUserProgress,
        createFamilyGroup,
        joinFamilyGroup,
        loading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within an UserDataProvider");
  }
  return context;
}
