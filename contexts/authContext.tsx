// /contexts/AuthContext.tsx

import React, { createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<any>;
  handleSignUp: (email: string, password: string) => Promise<any>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
