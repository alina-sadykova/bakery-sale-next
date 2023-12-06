import { ReactNode } from "react";

export interface ContextProps {
	children: ReactNode;
}

export interface LoginInput {
	email: string;
	password: string;
}
