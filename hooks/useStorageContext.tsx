import React from "react";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useState } from "react";

//context buat ngambil images dari supabase storage
interface StorageContextType {}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

interface StorageProviderProps {
  children: ReactNode;
}

export function StorageProvider({ children }: StorageProviderProps) {
  const value: StorageContextType = {};

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error("useStorage must be used within an StorageProvider");
  }
  return context;
}
