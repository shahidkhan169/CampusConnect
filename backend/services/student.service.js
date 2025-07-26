import { BadRequest } from "../utils/errors.js";
import { Student } from './../models/student.model.js';
import bcrypt from "bcryptjs";
import  jwt  from 'jsonwebtoken';


export const registerStudent = async (dto) => {
    const existing = await Student.findOne({ email: dto.email });
    if (existing)
        throw new BadRequest("Email already exists");

    const hashPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashPassword;
    const newStudent = new Student(dto);
    return await newStudent.save();
}

export const loginStudent = async (dto) => {
    const student = await Student.findOne({ email: dto.email });
    if (!student)
        throw new BadRequest("User Not Found");

    const isMatch = await bcrypt.compare(dto.password, student.password);
    if (!isMatch)
        throw new BadRequest("Password Incorrect");

    const token = jwt.sign(
        { id: student._id},
        process.env.JWT_SECRET
    );

    return token;
}