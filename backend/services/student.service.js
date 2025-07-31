import { STATUS } from "../constants/status.constants.js";
import { Alumni } from "../models/alumni.model.js";
import { Token } from "../models/token.models.js";
import { BadRequest } from "../utils/errors.js";
import { GeneralResponse } from "../utils/GeneralResponse.js";
import { Student } from './../models/student.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Company } from './../models/company.model.js';


export const registerStudent = async (dto) => {
    const existing = await Student.findOne({ email: dto.email });
    if (existing)
        throw new BadRequest("Email already exists");

    const hashPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashPassword;
    const newStudent = new Student(dto);
    const savedStudent = await newStudent.save();
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
        { id: student._id },
        process.env.JWT_SECRET
    );
    return new GeneralResponse(
        true,
        200,
        {token:token},
        "Login Successful"
    )
}

export const getStudent=async(id)=>{

    const student=await Student.findById(id);
    if(!student)
        throw new BadRequest("User Not Found");

    return new GeneralResponse(
        true,
        200,
        student,
        "Student Detail"
    )
}


export const updateStudent = async (id, dto) => {
    const updatedStudent = await Student.findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true
    })
    if (!updatedStudent)
        throw new BadRequest("Student not Found");
    return new GeneralResponse(
        true,
        200,
        updatedStudent,
        "Student details updated successfully"
    );
}

export const generateToken = async (id, alumniId, dto) => {

    const student=await Student.findById(id);
    if (!student)
        throw new BadRequest("Student Not Found");

    if (student.tokensRemaining <= 0)
        throw new BadRequest("You don't have enough monthly tokens");

    const alumni = await Alumni.findById(alumniId);
    if (!alumni)
        throw new BadRequest("Alumni Not Found");

    if (alumni.maxToken <= 0)
        throw new BadRequest(`${alumni.firstName} ${alumni.lastName} has received the maximum tokens`);

    const newToken = new Token({
        studentId: id,
        alumniId: alumniId,
        status: dto.status,
        mode: dto.mode,
        reason: dto.reason,
    })

    const savedToken = await newToken.save();
    return new GeneralResponse(
        true,
        200,
        savedToken,
        `Token send to ${alumni.firstName + " " + alumni.lastName}`
    )
}

export const viewTokensByStudent = async (id, responseStatus) => {
    const tokens = await Token.find({ studentId: id, status: responseStatus });
    if (!tokens)
        throw new BadRequest("Token section is Empty");
    return new GeneralResponse(
        true,
        200,
        tokens,
        `${responseStatus} Tokens`
    )
}


export const deletePendingToken=async(id,tokenId)=>{
    const deleteToken=await Token.findOneAndDelete({
        _id:tokenId,
        studentId:id,
        status:STATUS.PENDING
    })
    if(!deleteToken)
        throw new BadRequest("No Such Pending Tokens");
    const alumni=await Alumni.findById(deleteToken.alumniId);

    return new GeneralResponse(
        true, 
        200,
        deleteToken,
        `Token sent to ${alumni.firstName} ${alumni.lastName} has been deleted`
    )
}


export const viewCompany=async()=>{
    const companies=await Company.find();
    return new GeneralResponse(
        200,
        true,
        companies,
        "All Companies"
    )
}