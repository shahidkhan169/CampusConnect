import mongoose from "mongoose"
import { STUDENT_MODEL } from "../constants/model.constants.js"


const studentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    rollNo:{
        type:String,
        required:true,
        trim:true
    },
    program:{
        type:String,
        required:true,
        trim:true
    },
    branch:{
        type:String,
        required:true,
        trim:true
    },
    semester:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})

export const Student=mongoose.model(STUDENT_MODEL,studentSchema)