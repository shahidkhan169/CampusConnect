import { LoginDto, sRegisterDto, TokenDto, UpdateStudentDto } from "../dtos/student.dto.js";
import { generateToken, loginStudent, registerStudent, updateStudent } from "../services/student.service.js";
import { BadRequest } from "../utils/errors.js";
import { GeneralResponse } from "../utils/GeneralResponse.js";



export const Register = async (req, res, next) => {
    try {
        const dto = new sRegisterDto(req.body);
        const errors = dto.isValid();

        if (Object.keys(errors).length > 0)
            throw new BadRequest("Validation Erorr", errors);

        const response = await registerStudent(dto);
        res.status(response.statusCode).json(response)
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

        const response = await loginStudent(dto);
        res.status(200).json(response);

    }
    catch (err) {
        next(err);
    }
}

export const Update = async (req, res, next) => {
    try {
        const userId = req.userId;
        const dto = UpdateStudentDto.sanitize(req.body);
        const errors = dto.isValid();

        if (Object.keys(errors).length > 0)
            throw new BadRequest("Update Validation Error", errors);

        const response = await updateStudent(userId, dto);
        res.status(200).json(response);
    }
    catch (err) {
        next(err);
    }
}

export const GenerateToken = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { adminId } = req.params;
        const dto = new TokenDto(req.body);
        const errors = dto.isValid();

        if (Object.keys(dto) > 0)
            throw new BadRequest("Validation Error", errors);

        const savedToken = new generateToken(userId, adminId, sto)
    }
    catch (err) {
        next(err);
    }
}