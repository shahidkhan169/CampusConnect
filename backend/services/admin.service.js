import { Alumni } from "../models/alumni.model.js";
import { Invitation } from "../models/invitation.model.js";
import { EmailService } from "../utils/EmailService.js";
import { BadRequest } from "../utils/errors.js";
import { Admin } from './../models/admin.model.js';
import bcrypt from "bcryptjs";
import jwt  from 'jsonwebtoken';


export const registerAdmin = async (dto) => {
    const existing = await Admin.findOne({ email: dto.email });
    if (existing)
        throw new BadRequest("Email already exists");

    const hashPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashPassword;
    const newAdmin = new Admin(dto);
    return await newAdmin.save();
}


export const loginAdmin = async (dto) => {
    const admin = await Admin.findOne({ email: dto.email });
    if (!admin)
        throw new BadRequest("User Not Found");

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch)
        throw new BadRequest("Password Incorrect");

    const token = jwt.sign(
        { id: admin._id , superAdmin:admin.superAdmin},
        process.env.JWT_SECRET
    );

    return token;
}



export const InvitationService = {
  sendInvitation: async (email, fullName,adminId) => {
    const invitation = await Invitation.create({ email:email,sendBy:adminId });
    await EmailService.sendInvitationEmail({ email, fullName, id: invitation._id });
    return invitation;
}

};

