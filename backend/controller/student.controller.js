import { deletePendingToken, filterStudentByYearAndCompany, generateToken, getCompany, getStudent, loginStudent,  registerStudent, updateStudent, viewCompany, viewTokensByStudent } from "../services/student.service.js";
import { BadRequest } from "../utils/errors.js";
import { response } from 'express';
import { Company } from './../models/company.model.js';



export const Register = async (req, res, next) => {
    try {
        const dto =req.body;
        const response = await registerStudent(dto);
        res.status(response.statusCode).json(response)
    }
    catch (err) {
        next(err);
    }
}

export const Login = async (req, res, next) => {
    try {
        const dto = req.body;
        const response = await loginStudent(dto);
        res.status(200).json(response);

    }
    catch (err) {
        next(err);
    }
}

export const Update = async (req, res, next) => {
    try {
        const userId = req.userId;
        const dto = req.body;

        const response = await updateStudent(userId, dto);
        res.status(200).json(response);
    }
    catch (err) {
        next(err);
    }
}

export const GenerateToken = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { alumniId } = req.params;
        const dto = req.body;
        const response = await generateToken(userId, alumniId, dto)
        res.status(response.statusCode).json(response);
    }
    catch (err) {
        next(err);
    }
}

export const ViewTokens = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { responseStatus } = req.body;
        const respone = await viewTokensByStudent(userId, responseStatus);
        res.status(respone.statusCode).json(respone);
    }
    catch (err) {
        next(err);
    }
}

export const DeleteToken=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const tokenId=req.params.tokenId;
        const response=await deletePendingToken(userId,tokenId);
        res.status(response.statusCode).json(response);
    }
    catch(err){
        next(err)
    }
}

export const GetStudent=async(req,res,next)=>{
    try{
        const userId=req.userId;
        const response=await getStudent(userId);
        res.status(response.statusCode).json(response);
    }
    catch(err){
        next(err)
    }
}

export const ViewCompany=async(req,res,next)=>{
    try{
        const response=await viewCompany();
        res.status(res.statusCode).json(response);
    }
    catch(err){
        next(err);
    }
}

export const FilterAlumniByYearAndCompany=async(req,res,next)=>{
    try{
        const dto=req.body;
        const response=await filterStudentByYearAndCompany(dto);
        res.status(res.statusCode).json(response);
    }
    catch(err){
        next(err);
    }
}

export const GetCompany=async(req,res,next)=>{
    try{
        const {companyId}=req.body;
        const response=await getCompany(companyId);
        res.status(response.statusCode).json(response);
    }
    catch(err){
        next(err)
    }
}
