import * as yup from 'yup'
import { FILEREGEXP } from '../constants/regEx.constants.js';
export class CreateAlumniByAdmin {
    constructor(data) {
        this.email = data.email;
        this.password = "WelcomeLeader";
    }
}

export const alumniFirstUpdateSchema=yup.object({
    firstName:yup.string().trim().required("Firstname is Required"),
    lastName:yup.string().trim().required("Lastname is Required"),
    password:yup.string().trim().min(6,"Password must atleast 6 characters"),
    rollNo:yup.string().trim().required("Roll no id Required"),
    dob:yup.string().trim().required("Date of birth is Required"),
    passedOutYear:yup.string().trim().required("Passed Out Year is Required"),
    companyId:yup.string().required("Company is required"),
    designation:yup.string().trim().required("Designation is Required"),
    salaryPackage:yup.string().trim().required("Salary Package is Required"),
    file:yup.object({
        data:yup.mixed().required("File data is required"),
        contentType: yup
        .string()
        .trim()
        .required("Content type is required")
        .matches(FILEREGEXP, "Only png, jpg, jpeg, or pdf files are allowed"),
    }),
    rounds:yup.array()
    .of(
        yup.object({
            name:yup.string().trim().required("Round Name is Required"),
            description:yup.string().trim().required("Round Description is Required")
        })
    )
    .min(1, "At least one round experience is required")
    .required("Round Experience is Required"),
    generalDesc:yup.string().trim().required("General description is Required").optional(),
    socialMediaProfiles:yup.array()
    .of(
        yup.object({
            name:yup.string().trim(),
            link:yup.string().trim().required("Invalid Link")
        })
    )
    .optional()
})