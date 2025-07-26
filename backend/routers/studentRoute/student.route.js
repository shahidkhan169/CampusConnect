import express from 'express'
import { Login, Register } from '../../controller/student.controller.js';
export const StudentRouter=express.Router();

StudentRouter.post('/createStudent',Register);
StudentRouter.post('/loginStudent',Login);
