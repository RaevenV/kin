import React from "react";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useState } from "react";

//context buat ngambil images dari supabase storage
interface QuestionContextType {}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

interface StorageProviderProps {
  children: ReactNode;
}

export function StorageProvider({ children }: StorageProviderProps) {
  const value: QuestionContextType = {};

  return (
    <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useStorage must be used within an StorageProvider");
  }
  return context;
}
