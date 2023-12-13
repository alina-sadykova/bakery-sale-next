"use client";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { User } from "@/models/user";
import { ContextProps, LoginInput } from "./types";
import { FirebaseError } from "firebase/app";

interface IAuthContext {
  user: User | null;
  error: FirebaseError | null;
  register: (input: LoginInput) => void;
  login: (input: LoginInput) => void;
  logout: () => void;
  resetError: () => void;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuthContext = () => useContext(authContext);

const AuthContextProvider: FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<FirebaseError | null>(null);
  async function register({ email, password }: LoginInput) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e as FirebaseError);
    }
  }

  async function login({ email, password }: LoginInput) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e as FirebaseError);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (e) {
      setError(e as FirebaseError);
    }
  }

  function resetError() {
    setError(null);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email as string });
      } else {
        setUser(null);
      }
    });
  }, []);

  const value = {
    user,
    register,
    login,
    logout,
    resetError,
    error,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
