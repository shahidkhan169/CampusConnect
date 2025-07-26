import express from 'express'
import { Login, Register, sendInvitation } from '../../controller/admin.controller.js';
import { auth } from '../../middlewares/auth.js';


export const AdminRouter=express.Router();

AdminRouter.post('/createAdmin',Register);
AdminRouter.post('/loginAdmin',Login);
AdminRouter.post('/invite',auth,sendInvitation)