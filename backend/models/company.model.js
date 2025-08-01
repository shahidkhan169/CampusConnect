import mongoose from "mongoose";
import { COMPANY_MODEL } from "../constants/model.constants.js";



const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyImg: {
        data: String,
        contentType: String,
    },
    avgPackage:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

export const Company=mongoose.model(COMPANY_MODEL,companySchema);