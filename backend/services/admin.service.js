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
import { PlacedStudent } from "../models/placedStudent.model.js";
import XLSX from "xlsx";


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

export const updateInvitation = async (invitationId) => {
    const exists = await Invitation.findById(invitationId);
    if (!exists)
        throw new BadRequest("Invitation Not Found");
    const updatedInvitation = await Invitation.findByIdAndUpdate(invitationId, { status: STATUS.ACCEPTED, acceptedAt: Date.now() }, {
        new: true,
        runValidators: true
    });

    const dto = {
        email: updatedInvitation.email,
    }
    return dto;
}

export const createAlumni = async (dto) => {
    const existing = await Alumni.findOne({ email: dto.email });
    if (existing)
        throw new BadRequest("User Already Exists");
    const newAlumni = new Alumni(dto);
    const savedAlumni = await newAlumni.save();
    return new GeneralResponse(
        true,
        201,
        savedAlumni,
        "Alumni Created Successfully"
    )
}

export const addCompanyAndPlacedStudent = async (companyName, companyImg, avgPackage, description, excelFile) => {
    const workbook = XLSX.read(excelFile.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet);
    const exists = await Company.findOne({
        companyName: { $regex: `^${companyName}$`, $options: "i" }
    });

    let company_Id;
    if (!exists) {
        const companySet = new Company(
            {
                companyName: companyName,
                companyImg: {
                    data: companyImg.buffer.toString("base64"),
                    contentType: companyImg.mimetype
                },
                avgPackage: avgPackage,
                description: description
            }
        )
        const company = await companySet.save();
        company_Id = company._id;
    }
    else {
        company_Id = exists._id
    }

    const uniqueRowsMap = new Map();

    rows.forEach(row => {
        const key = row.email?.toLowerCase();
        if (key && !uniqueRowsMap.has(key)) {
            uniqueRowsMap.set(key, {
                name: row.name,
                email: row.email,
                department: row.department,
                companyId: company_Id,
                package: row.package
            });
        }
    });
    const placedStudentDetails = Array.from(uniqueRowsMap.values());
    const details = await PlacedStudent.insertMany(placedStudentDetails);
    return new GeneralResponse(
        true,
        200,
        details,
        "Details uploaded Successfully"
    )
}