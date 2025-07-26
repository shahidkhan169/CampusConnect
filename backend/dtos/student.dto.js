import { isEmail, isMobilePhone } from 'class-validator';
import { PHONEREGEXP, EMAILREGEXP } from '../constants/regEx.constants.js';

export class sRegisterDto {
    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.rollNo = data.rollNo;
        this.program = data.program;
        this.branch = data.branch;
        this.semester = data.semester;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.password = data.password;
    }

    isValid() {
        const errors = {};

        if (!this.firstName) errors.firstName = "First name is required";
        if (!this.lastName) errors.lastName = "Last name is required";
        if (!this.rollNo) errors.rollNo = "Roll No is required";
        if (!this.program) errors.program = "Program is required";
        if (!this.branch) errors.branch = "Branch is required";
        if (!this.semester) errors.semester = "Semester is required";

        if (
            !this.phoneNumber ||
            !isMobilePhone(this.phoneNumber, "en-IN") ||
            !PHONEREGEXP.test(this.phoneNumber)
        ) {
            errors.phoneNumber = "Invalid phone number";
        }

        if (
            !this.email ||
            !isEmail(this.email) ||
            !EMAILREGEXP.test(this.email)
        ) {
            errors.email = "Invalid email";
        }

        if (!this.password || this.password.length < 6) {
            errors.password = "Password should be at least 6 characters";
        }

        return errors;
    }
}


export class LoginDto {
    constructor(data) {
        this.email = data.email;
        this.password = data.password;
    }

    isValid() {
        const errors = {}

        if (!this.email || !EMAILREGEXP.test(this.email)) {
            errors.email = "Invalid email";
        }

        if (!this.password) {
            errors.password = "Password is required";
        }
        return errors;
    }
}