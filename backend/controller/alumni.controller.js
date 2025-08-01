import { Admin } from "../models/admin.model.js";
import { declineTokenByAdmin, getAlumni, loginAlumni, scheduleTokenByAdmin,  updateAlumni,  updateAlumniAtFirst,  viewTokensByAlumni } from "../services/alumni.service.js";
import { BadRequest } from "../utils/errors.js";
import { response } from 'express';



export const Login = async (req, res, next) => {
    try {
        const dto = req.body;
        const response = await loginAlumni(dto);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err)
    }
}

export const GetAlumni=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const dto=req.body;
        const response=await getAlumni(userId);
        res.status(response.statusCode).json(response);
    }
    catch(err){
        next(err);
    }
}

export const UpdateAlumniAtFirst=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const dto=req.body;
        const response=await updateAlumniAtFirst(userId,dto);
        res.status(response.statusCode).json(response);
    }
    catch(err){
        next(err);
    }
}


export const ViewTokens = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { responseStatus } = req.body;
        const respone = await viewTokensByAlumni(userId, responseStatus);
        res.status(respone.statusCode).json(respone);
    }
    catch (err) {
        next(err);
    }
}

export const ScheduleTokenByAdmin = async (req, res, next) => {
    try {
        const userId = req.userId;
        const studentId = req.params.studentId;
        const tokenId = req.params.tokenId;
        const { date } = req.body;
        const response = await scheduleTokenByAdmin(userId, studentId, tokenId, date);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err);
    }

}

export const DeclineToken = async (req, res, next) => {
    try {
        const userId = req.userId;
        const tokenId = req.params.tokenId;
        const response = await declineTokenByAdmin(userId, tokenId);
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err)
    }
}

export const UpdateAlumni=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const dto=req.body;
        const response=await updateAlumni(userId,dto);
        res.status(response.statusCode).json(response);
    }
    catch(err){
        next(err);
    }
}

