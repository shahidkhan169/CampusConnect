import express from 'express'
import { AddCompany, CreateAlumni, Login, Register, sendInvitation } from '../../controller/admin.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validateRequest } from './../../middlewares/ValidationRequest.js';
import { addCompanySchema, adminRegisterSchema } from '../../dtos/admin.dto.js';
import { LoginSchema } from '../../dtos/student.dto.js';


export const AdminRouter=express.Router();

AdminRouter.post('/createAdmin',validateRequest(adminRegisterSchema),Register);
AdminRouter.post('/loginAdmin',validateRequest(LoginSchema),Login);
AdminRouter.post('/invite',auth,sendInvitation)
AdminRouter.get('/createAlumni/:invitationId',CreateAlumni);
AdminRouter.post('/addCompany',validateRequest(addCompanySchema),AddCompany);