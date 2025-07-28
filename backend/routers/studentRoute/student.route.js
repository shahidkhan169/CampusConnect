import express from 'express'
import { GenerateToken, Login, Register, Update } from '../../controller/student.controller.js';
import { auth } from './../../middlewares/auth.js';
export const StudentRouter=express.Router();

StudentRouter.post('/createStudent',Register);
StudentRouter.post('/loginStudent',Login);
StudentRouter.patch('/updateStudent',auth,Update);
StudentRouter.post('/generateToken/:adminId',auth,GenerateToken);
