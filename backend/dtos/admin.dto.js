import * as yup from "yup";
import { EMAILREGEXP, FILEREGEXP} from "../constants/regEx.constants.js";



export const adminRegisterSchema=yup.object({
    userName:yup.string().trim().required("Username is Required"),
    email:yup.string().email("Invalid Email").matches(EMAILREGEXP,"Invalid EMail").required("Email is Required"),
    password:yup.string().trim().required("Password is Required"),
})

export const addCompanySchema=yup.object({
    companyName:yup.string().trim().required("Company Name is Required"),
    companyImg:yup.object({
            data:yup.mixed().required("File data is required"),
            contentType: yup
            .string()
            .trim()
            .required("Content type is required")
            .matches(FILEREGEXP, "Only png, jpg, jpeg, files are allowed"),
        }),
})