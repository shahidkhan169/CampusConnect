import mongoose from "mongoose";
import { COMPANY_MODEL } from "../constants/model.constants.js";



const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyImg: {
        data: Buffer,
        contentType: String,
        fileName: String
    }
})

export const Company=mongoose.model(COMPANY_MODEL,companySchema);