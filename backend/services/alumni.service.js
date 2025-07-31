import { Alumni } from "../models/alumni.model.js"
import { BadRequest } from "../utils/errors.js";
import jwt from 'jsonwebtoken';
import { GeneralResponse } from "../utils/GeneralResponse.js";
import bcrypt from "bcryptjs";
import { Token } from "../models/token.models.js";
import { STATUS } from "../constants/status.constants.js";
import { Student } from "../models/student.model.js";
import { token } from "morgan";


export const loginAlumni = async (dto) => {
    const alumni = await Alumni.findOne({ email: dto.email });
    if (!alumni)
        throw new BadRequest("User Not Found");


    if (dto.password !== alumni.password)
        throw new BadRequest("Password Incorrect");

    const token = jwt.sign({
        id: alumni._id
    },
        process.env.JWT_SECRET
    )
    return new GeneralResponse(
        true,
        200,
        token,
        "Login Successful"
    )
}


export const viewTokensByAlumni = async (id, responseStatus) => {
    const tokens = await Token.find({ alumniId: id, status: responseStatus });
    if (!tokens)
        throw new BadRequest("Token section is Empty");
    return new GeneralResponse(
        true,
        200,
        tokens,
        `${responseStatus} Tokens`
    )
}


export const scheduleTokenByAdmin = async (alumniId, studentId, tokenId, date) => {
    const student = await Student.findById(studentId);
    if (!student)
        throw new BadRequest("Student Not Found");


    const alumni = await Alumni.findById(alumniId);
    if (!alumni)
        throw new BadRequest("Alumni Not Found");


    const updatedToken = await Token.findOneAndUpdate(
        { _id: tokenId, alumniId: alumniId, studentId: studentId, status: STATUS.PENDING },
        { 
            $set: { 
                dateScheduledByAdmin: date, 
                responsedAt: Date.now(), 
                status: STATUS.ACCEPTED 
            } 
        },
        { new: true }
    );

    if (!updatedToken)
        throw new BadRequest("No such pending token found");

    await Promise.all([
        Student.findByIdAndUpdate(studentId, { $inc: { tokensRemaining: -1 } }, { new: true }),
        Alumni.findByIdAndUpdate(alumniId, { $inc: { maxToken: -1 } }, { new: true })
    ]);


    return new GeneralResponse(
        true,
        200,
        updatedToken,
        `Date scheduled for ${student.firstName} ${student.lastName}. Connecting ${alumni.firstName} ${alumni.lastName} and ${student.firstName} ${student.lastName} through ${updatedToken.mode}`
    );
};


export const declineTokenByAdmin = async (id, tokenId) => {

    const deleteToken = await Token.findOneAndDelete({
        _id: tokenId,
        alumniId: id
    })

    if (!deleteToken)
        throw new BadRequest("No such Token");
    const student = await Student.findById(deleteToken.studentId);
    return new GeneralResponse(
        true,
        200,
        deleteToken,
        `${student.firstName + " " + student.lastName}'s token had been declined`
    )
}

export const updateAlumniAtFirst=async(id,dto)=>{

    const updatedAlumniProfile=await Alumni.findByIdAndUpdate(id,dto);
    if(!updatedAlumniProfile)
        throw new BadRequest("No User Found");

    return new GeneralResponse(
        true,
        200,
        updatedAlumniProfile,
        "Profile Updated"
    )
}