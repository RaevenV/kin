import React from "react";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useState } from "react";

interface UserDataContextType {
  updateUserProgress:() => Promise<string|null>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
}

export function UserDataProvider({ children }: UserDataProviderProps) {
  
  async function updateUserProgress(): Promise<string | null> {
    return "User progress updated";
  }
  
  return (
    <UserDataContext.Provider value={{
      updateUserProgress,
    }}>{children}</UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within an UserDataProvider");
  }
  return context;
}
