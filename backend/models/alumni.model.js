import mongoose, { model } from "mongoose";
import { ALUMNI_MODEL, COMPANY_MODEL } from "../constants/model.constants.js";


const roundDescSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }
});

const alumniSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COMPANY_MODEL
    },
    designation:{
        type:String,
        trim:true
    },
    file: {
        data: Buffer,
        contentType: String,
        fileName: String
    },
    rounds: [roundDescSchema],
    generalDesc: {
        type: String,
    },
    active:{
        type:Boolean,
        default:true
    },
    lastSeen:{
        type:Date,
        default:Date.now()
    }
});

export const Alumni=mongoose.model(ALUMNI_MODEL,alumniSchema);