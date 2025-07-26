import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Forbidden, Unauthorized } from '../utils/errors.js';

dotenv.config();

export const auth = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) 
            return next(new Unauthorized("User Unauthorized"));

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) 
                return next(new Forbidden("Token Forbidden"));
            req.userId = user.id; 
            next();
        });
};

