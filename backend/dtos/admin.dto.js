import { isEmail } from "class-validator";
import { EMAILREGEXP } from "../constants/regEx.constants.js";


export class adRegisterDto {
    constructor(data) {
        this.userName = data.userName;
        this.email = data.email;
        this.password = data.password;
        this.superAdmin = data.superAdmin
    }

    isValid() {
        const errors = {};

        if (!this.userName) errors.userName = "Username is required";
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

