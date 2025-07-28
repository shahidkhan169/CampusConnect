import { Alumni } from "../models/alumni.model.js";
import { Token } from "../models/token.models.js";
import { BadRequest } from "../utils/errors.js";
import { GeneralResponse } from "../utils/GeneralResponse.js";
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
    const savedStudent=await newStudent.save();
    return new GeneralResponse(
        true,
        201,
        savedStudent,
        "Student Created Successfully"
    );
}

export const loginStudent = async (dto) => {
    const student = await Student.findOne({ email: dto.email });
    if (!student)
        throw new BadRequest("Student Not Found");

    const isMatch = await bcrypt.compare(dto.password, student.password);
    if (!isMatch)
        throw new BadRequest("Password Incorrect");

    const token = jwt.sign(
        { id: student._id},
        process.env.JWT_SECRET
    );
    return new GeneralResponse(
        true,
        200,
        token,
        "Login Successful"
    )
}


export const updateStudent=async(id,dto)=>{
    const updatedStudent=await Student.findByIdAndUpdate(id,dto,{
        new:true,
        runValidators:true
    })
    if(!updatedStudent)
        throw new BadRequest("Student not Found");
    return new GeneralResponse(
        true,
        200,
        updatedStudent,
        "Student details updated successfully"
    );
}

export const generateToken=async(id,adminId,dto)=>{
    const studentExists=await Student.findById(id);
    if(!studentExists)
        throw new BadRequest("Student not Found");
    const alumniExists=await Alumni.findById(adminId);
    if(!alumniExists)
        throw new BadRequest("Alumni not Found");

    const newToken=new Token({
        studentId:id,
        adminId:adminId,
        status:dto.status,
        mode:dto.mode,
        reason:dto.reason,
    })

    const savedToken=await newToken.save();
    return new GeneralResponse(
        true,
        200,
        savedToken,
        `Token send to ${alumniExists.firstName+" "+alumniExists.lastName}`
    )
}