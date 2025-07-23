// /hooks/useAuth.ts

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { login, signUp, logout, subscribeToAuthChanges } from "@/firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const handleLogin = async (email: string, password: string) => {
    return login(email, password);
  };

  const handleSignUp = async (email: string, password: string) => {
    return signUp(email, password);
  };

  const handleLogout = async () => {
    return logout();
  };

  return {
    user,
    authLoading,
    handleLogin,
    handleSignUp,
    handleLogout,
  };
}
