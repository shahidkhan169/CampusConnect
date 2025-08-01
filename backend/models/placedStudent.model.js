import mongoose from "mongoose";
import { COMPANY_MODEL, PLACED_STUDENT_MODEL } from "../constants/model.constants.js";



const placedStudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:COMPANY_MODEL
    },
    package:{
        type:String,
        required:true
    }
})

export const PlacedStudent=mongoose.model(PLACED_STUDENT_MODEL,placedStudentSchema);

