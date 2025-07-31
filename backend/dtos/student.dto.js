import * as yup from "yup";
import { PHONEREGEXP, EMAILREGEXP } from "../constants/regEx.constants.js";


export const studentRegisterSchema= yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required"),

  rollNo: yup
    .string()
    .trim()
    .required("Roll No is required"),

  program: yup
    .string()
    .trim()
    .required("Program is required"),

  branch: yup
    .string()
    .trim()
    .required("Branch is required"),

  semester: yup
    .string()
    .trim()
    .required("Semester is required"),

  phoneNumber: yup
    .string()
    .matches(PHONEREGEXP, "Invalid phone number")
    .required("Phone number is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .matches(EMAILREGEXP, "Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});


export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .matches(EMAILREGEXP, "Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required"),
});


export const studentUpdateSchema = yup.object({
  firstName: yup.string().trim().optional(),
  lastName: yup.string().trim().optional(),
  semester: yup.string().trim().optional(),
  phoneNumber: yup
    .string()
    .matches(PHONEREGEXP, "Invalid phone number")
    .optional(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export const tokenSchema = yup.object({
  mode: yup
    .string()
    .oneOf(["Telephonic", "Chat"], "Invalid mode")
    .required("Mode is required"),

  reason: yup
    .string()
    .min(10, "Reason must be at least 10 characters")
    .required("Reason is required"),
});
