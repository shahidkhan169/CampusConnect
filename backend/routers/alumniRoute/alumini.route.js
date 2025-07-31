import express from 'express'

import { DeclineToken, Login, ScheduleTokenByAdmin, UpdateAlumniAtFirst, ViewTokens } from '../../controller/alumni.controller.js';
import { auth } from '../../middlewares/auth.js';
import { declineTokenByAdmin } from '../../services/alumni.service.js';
import { validateRequest } from './../../middlewares/ValidationRequest.js';
import { LoginSchema } from '../../dtos/student.dto.js';
import { alumniFirstUpdateSchema } from '../../dtos/alumni.dto.js';

export const AlumniRouter=express.Router()

AlumniRouter.post("/loginAlumni",validateRequest(LoginSchema),Login);
AlumniRouter.post("/viewTokens",auth,ViewTokens);
AlumniRouter.post("/scheduleToken/:studentId/:tokenId",auth,ScheduleTokenByAdmin);
AlumniRouter.delete("/declineToken/:tokenId",auth,DeclineToken)
AlumniRouter.patch("/updateAlumniFirst",validateRequest(alumniFirstUpdateSchema),auth,UpdateAlumniAtFirst);
