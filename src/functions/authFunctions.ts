import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (rememberMe) {
      localStorage.setItem("loginTimestamp", Date.now().toString());
    }

    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Invalid login credentials.");
  }
};

export const loginWithProvider = async (provider: any, rememberMe: boolean) => {
  try {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithPopup(auth, provider);

    if (rememberMe) {
      localStorage.setItem("loginTimestamp", Date.now().toString());
    }

    return userCredential.user;
  } catch (error) {
    console.error("OAuth login error:", error);
    throw new Error("Login with provider failed.");
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("loginTimestamp");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const checkSessionExpiry = () => {
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  if (loginTimestamp) {
    const elapsedTime = Date.now() - parseInt(loginTimestamp, 10);
    if (elapsedTime > SESSION_DURATION) {
      logoutUser();
      return true; // Session expired
    }
  }
  return false; // Session active
};

export const validatePassword = (password: string, confirmPassword?: string): string => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*_]/.test(password);

  if (password.length < minLength) return "Password must be at least 12 characters long.";
  if (!hasUpperCase) return "Password must include at least one uppercase letter.";
  if (!hasNumber) return "Password must include at least one number.";
  if (!hasSpecialChar) return "Password must include at least one special character (!@#$%^&*_).";
  if (confirmPassword && password !== confirmPassword) return "Passwords do not match.";

  return "";
};
