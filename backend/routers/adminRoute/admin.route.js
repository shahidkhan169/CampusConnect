import express from 'express'
import {  AddCompanyAndPlacedStudent, CreateAlumni, Login, Register, sendInvitation } from '../../controller/admin.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validateRequest } from './../../middlewares/ValidationRequest.js';
import { addCompanySchema, adminRegisterSchema } from '../../dtos/admin.dto.js';
import { LoginSchema } from '../../dtos/student.dto.js';
import { upload } from './../../utils/muter.js';


export const AdminRouter=express.Router();

AdminRouter.post('/createAdmin',validateRequest(adminRegisterSchema),Register);
AdminRouter.post('/loginAdmin',validateRequest(LoginSchema),Login);
AdminRouter.post('/invite',auth,sendInvitation)
AdminRouter.get('/createAlumni/:invitationId',CreateAlumni);
AdminRouter.post('/addPlaced',upload.fields([{name:"companyImg",maxCount:1},{name:"excelFile",maxCount:1}]),AddCompanyAndPlacedStudent);