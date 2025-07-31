import { Alumni } from "../models/alumni.model.js";
import { Invitation } from "../models/invitation.model.js";
import { EmailService } from "../utils/EmailService.js";
import { BadRequest } from "../utils/errors.js";
import { Admin } from './../models/admin.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { INVITE_TEMPLATE } from './../constants/emailTemplate.constants.js';
import { GeneralResponse } from "../utils/GeneralResponse.js";
import { STATUS } from "../constants/status.constants.js";
import { Company } from "../models/company.model.js";
import { toCamelCase } from "../utils/toCamelCase.js";


export const registerAdmin = async (dto) => {
    const existing = await Admin.findOne({ email: dto.email });
    if (existing)
        throw new BadRequest("Email already exists");

    const hashPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashPassword;
    const newAdmin = new Admin(dto);
    const savedAdmin = await newAdmin.save();
    return new GeneralResponse(
        true,
        201,
        savedAdmin,
        "Admin Created Successfully"
    )
}


export const loginAdmin = async (dto) => {
    const admin = await Admin.findOne({ email: dto.email });
    if (!admin)
        throw new BadRequest("User Not Found");

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch)
        throw new BadRequest("Password Incorrect");

    const token = jwt.sign(
        { id: admin._id, superAdmin: admin.superAdmin },
        process.env.JWT_SECRET
    );

    return new GeneralResponse(
        true,
        200,
        { token: token },
        "Login Successfull"
    );

}



export const InvitationService = {
    sendInvitation: async (email, fullName, adminId) => {
        const invitation = await Invitation.create({ email: email, sendBy: adminId });
        await EmailService.sendInvitationEmail({ email, fullName, id: invitation._id, template: INVITE_TEMPLATE });
        return new GeneralResponse(
            true,
            200,
            { invitationId: invitation._id },
            "Email Sent Successfully"
        );
    }
};

export const updateInvitation= async (invitationId) => {
    const exists=await Invitation.findById(invitationId);
    if(!exists)
        throw new BadRequest("Invitation Not Found");
    const updatedInvitation=await Invitation.findByIdAndUpdate(invitationId,{status:STATUS.ACCEPTED,acceptedAt:Date.now()},{
        new:true,
        runValidators:true
    });

    const dto={
        email:updatedInvitation.email,
    }
    return dto;
}
        
export const createAlumni=async(dto)=>{
    const existing=await Alumni.findOne({email:dto.email});
    if(existing)
        throw new BadRequest("User Already Exists");
    const newAlumni=new Alumni(dto);
    const savedAlumni=await newAlumni.save();
    return new GeneralResponse(
        true,
        201,
        savedAlumni,
        "Alumni Created Successfully"
    )
}

export const addCompany=async(dto)=>{
    
    let _companyName=toCamelCase(dto.companyName);
    const exists=await Company.findOne({companyName:_companyName});
    if(exists)
        throw new BadRequest("Company Already Exists");

    const company=new Company({
        companyName:_companyName,
        companyImg:dto.companyImg
    })
    await company.save();

    return new GeneralResponse(
        true,
        200,
        company,
        "Company Added Successfully"
    )
}