import { LoginDto, sRegisterDto } from "../dtos/student.dto.js";
import { loginStudent, registerStudent } from "../services/student.service.js";
import { BadRequest } from "../utils/errors.js";
import { GeneralResponse } from "../utils/GeneralResponse.js";



export const Register = async (req, res, next) => {
    try {
        const dto = new sRegisterDto(req.body);
        const errors = dto.isValid();

        if (Object.keys(errors).length > 0)
            throw new BadRequest("Validation Erorr", errors);

        const savedStudent = await registerStudent(dto);
        res.status(201).json(new GeneralResponse(true, 201, savedStudent, "Student Created"))
    }
    catch (err) {
        next(err);
    }
}

export const Login = async (req, res, next) => {
    try {
        const dto = new LoginDto(req.body);
        const errors = dto.isValid()

        if (Object.keys(errors).length > 0)
            throw new BadRequest("Validation Error", errors);

        const token = await loginStudent(dto);
        res.status(200).json(new GeneralResponse(true, 200, token, "Login Successful"));

    }
    catch (err) {
        next(err);
    }
}