import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

/**
 * Sign up a new user with email and password
 */
export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Login existing user with email and password
 */
export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logout the current user
 */
export const logout = () => {
  return signOut(auth);
};

/**
 * Subscribe to auth state changes
 * @param callback Called when user logs in/out
 * @returns unsubscribe function
 */
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};
