import { adRegisterDto } from "../dtos/admin.dto.js";
import { LoginDto } from "../dtos/student.dto.js";
import { InvitationService, loginAdmin, registerAdmin } from "../services/admin.service.js";
import { BadRequest } from "../utils/errors.js";
import { GeneralResponse } from "../utils/GeneralResponse.js";
import { EmailService } from "../utils/EmailService.js";
import { CreateAlumniByAdmin } from "../dtos/alumni.dto.js";



export const Register = async (req, res, next) => {
    try {
        const dto = new adRegisterDto(req.body);
        const errors = dto.isValid();

        if (Object.keys(errors).length > 0)
            throw new BadRequest("Validation Erorr", errors);

        const response= await registerAdmin(dto);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err);
    }
}

export const Login = async (req, res, next) => {
    try {
        const dto = new LoginDto(req.body);
        const errors = dto.isValid();

        if (Object.keys(errors).length > 0)
            throw new BadRequest("Validation Erorr", errors);

        const response= await loginAdmin(dto);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err);
    }
}


export const sendInvitation = async (req, res, next) => {
    try {
        const userId=req.userId;
        const { email, fullName } = req.body;
        const invitation = await InvitationService.sendInvitation(email, fullName,userId);
        res.status(200).send(new GeneralResponse("true", 200, { invitationId: invitation._id }, "Invitation sent"));
    } 
    catch (err) {
        next(err);
    }
};


export const CreateAdmin=async(req,res,next)=>{
    try{
        const invitationId=req.params;
        const dto=await updateInvitation(invitationId);
    }
    catch(err){
        next(err);
    }
}