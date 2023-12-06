import React, { FC, createContext, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { User } from "@/models/user";
import { ContextProps, LoginInput } from "./types";

interface IAuthContext {
	user: User | null;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContext: FC<ContextProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	async function register({ email, password }: LoginInput) {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			setUser({ email: userCredential.user.email as string });
			console.log(userCredential, "userCredential");
		} catch (e) {
			console.log(e);
		}
	}

	async function login({ email, password }: LoginInput) {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			setUser({ email: userCredential.user.email as string });
			console.log(userCredential, "userCredential");
		} catch (e) {
			console.log(e);
		}
	}

	async function logout() {
		try {
			await signOut(auth);
		} catch (e) {
			console.log(e);
		}
	}

	const value = {
		user,
		register,
		login,
		logout,
	};
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;