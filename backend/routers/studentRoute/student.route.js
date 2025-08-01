import express from 'express'
import { DeleteToken, FilterAlumniByYearAndCompany, GenerateToken, GetCompany, GetStudent, Login, Register, Update, ViewCompany, ViewTokens } from '../../controller/student.controller.js';
import { auth } from './../../middlewares/auth.js';
import { LoginSchema, studentRegisterSchema, tokenSchema } from '../../dtos/student.dto.js';
import { validateRequest } from './../../middlewares/ValidationRequest.js';
import { studentUpdateSchema } from './../../dtos/student.dto.js';

export const StudentRouter=express.Router();

StudentRouter.post('/createStudent',validateRequest(studentRegisterSchema),Register);
StudentRouter.post('/loginStudent',validateRequest(LoginSchema),Login);
StudentRouter.patch('/updateStudent',validateRequest(studentUpdateSchema),auth,Update);
StudentRouter.post('/generateToken/:alumniId',validateRequest(tokenSchema),auth,GenerateToken);
StudentRouter.post('/viewTokens',auth,ViewTokens);
StudentRouter.delete('/deleteToken/:tokenId',auth,DeleteToken);
StudentRouter.get('/getStudent',auth,GetStudent);
StudentRouter.get('/getCompanies',ViewCompany);
StudentRouter.post('/sortAlumni',FilterAlumniByYearAndCompany);
StudentRouter.post('/getCompany',GetCompany);