import mongoose from "mongoose";
import { ADMIN_MODEL } from "../constants/model.constants.js";


const adminSchema=new mongoose.Schema({
    userName:{
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
    },
    superAdmin:{
        type:Boolean,
        default:false
    }
})

export const Admin=mongoose.model(ADMIN_MODEL,adminSchema);
