import React from "react";
import AuthForm from "@/components/screens/auth/AuthForm";
import type { Metadata } from "next";
import { generateTitle } from "@/components/common/helper";

export const metadata: Metadata = {
	title: generateTitle("Authentication"),
	description: "Authenticate to Bakery shop",
};

const AuthPage = () => {
	return <AuthForm />;
};

export default AuthPage;
