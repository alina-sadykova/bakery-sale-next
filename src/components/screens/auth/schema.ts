import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const authSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.required("Email is required field"),
	password: Yup.string()
		.min(6, "Password is too short")
		.required("Password is required")
		.matches(passwordRules, { message: "Please create a stronger password" }),
});
