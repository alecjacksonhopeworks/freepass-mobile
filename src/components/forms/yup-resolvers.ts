import * as yup from "yup";

export const passwordResolver = yup
  .string()
  .required("Please enter your password")
  .min(8, "Password must be at least 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    "Must contain one uppercase, one lowercase, one number, and one special character",
  );
