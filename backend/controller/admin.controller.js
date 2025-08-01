import { addCompanyAndPlacedStudent, createAlumni, InvitationService, loginAdmin, registerAdmin, updateInvitation } from "../services/admin.service.js";
import { BadRequest } from "../utils/errors.js";
import { GeneralResponse } from "../utils/GeneralResponse.js";
import { EmailService } from "../utils/EmailService.js";
import { CreateAlumniByAdmin } from "../dtos/alumni.dto.js";
import { response } from 'express';




export const Register = async (req, res, next) => {
    try {
        const dto = req.body;
        const response = await registerAdmin(dto);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err);
    }
}

export const Login = async (req, res, next) => {
    try {

        const dto = req.body;
        const response = await loginAdmin(dto);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err);
    }
}


export const sendInvitation = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { email, fullName } = req.body;
        const invitation = await InvitationService.sendInvitation(email, fullName, userId);
        res.status(200).send(invitation);
    }
    catch (err) {
        next(err);
    }
};


export const CreateAlumni = async (req, res, next) => {
    try {
        const invitationId = req.params.invitationId;
        const invitation = await updateInvitation(invitationId);
        const dto = new CreateAlumniByAdmin(invitation);
        const response = await createAlumni(dto);
        res.status(response.statusCode).send(response);
    }
    catch (err) {
        next(err);
    }
}

export const AddCompanyAndPlacedStudent = async (req, res, next) => {
    try {
        const { companyName, avgPackage, description } = req.body;
        const companyImg = req.files?.companyImg?.[0];
        const excelFile = req.files?.excelFile?.[0];
        if (!companyName)
            throw new BadRequest("Company Name is Required")
        if (!companyImg)
            throw new BadRequest("Company Image is Required")
        if (!excelFile)
            throw new BadRequest("Excel file is Required")

        const response = await addCompanyAndPlacedStudent(companyName, companyImg, avgPackage, description, excelFile);
        res.status(response.statusCode).json(response);

    }
    catch (err) {
        next(err);
    }
};
