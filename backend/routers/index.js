import express from 'express';
import { ADMIN_ROUTE, ALUMNI_ROUTE, STUDENT_ROUTE } from '../constants/route.constants.js';
import { StudentRouter } from './studentRoute/student.route.js';
import { AdminRouter } from './adminRoute/admin.route.js';
import { AlumniRouter } from './alumniRoute/alumini.route.js';

export const router = express.Router();

router.use(STUDENT_ROUTE, StudentRouter)
router.use(ADMIN_ROUTE,AdminRouter)
router.use(ALUMNI_ROUTE,AlumniRouter)




