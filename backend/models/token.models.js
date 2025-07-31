import mongoose from "mongoose";
import { ADMIN_MODEL, ALUMNI_MODEL, STUDENT_MODEL, TOKEN_MODEL } from "../constants/model.constants.js";
import { MODE, STATUS } from "../constants/status.constants.js";
import { response } from "express";


const tokenSchema=new mongoose.Schema({
    alumniId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ALUMNI_MODEL,
        required:true
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:STUDENT_MODEL,
        required:true
    },
    status:{
        type:String,
        enum:STATUS,
        default:STATUS.PENDING,
    },
    mode:{
        type:String,
        enum:MODE,
        required:true
    },
    reason:{
        type:String,
        required:true,
        trim:true
    },
    dateScheduledByAdmin:{
        type:Date
    },
    sendAt:{
        type:Date,
        default:Date.now()
    },
    responsedAt:{
        type:Date
    }
})

export const Token=mongoose.model(TOKEN_MODEL,tokenSchema)