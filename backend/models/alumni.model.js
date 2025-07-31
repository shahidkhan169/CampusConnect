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

const profiles=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

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
    rollNo:{
        type:String
    },
    dob: {
        type: Date,
    },
    passedOutYear:{
        type:String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COMPANY_MODEL
    },
    designation:{
        type:String,
        trim:true
    },
    salaryPackage:{
        type:String
    },
    file: {
        data: String,
        contentType: String,
        fileName: String
    },
    rounds: {
      type:[roundDescSchema],
      default:[]
    },
    generalDesc: {
        type: String,
    },
    socialMediaProfiles:{
        type:[profiles],
        default:[]
    },
    maxToken:{
        type:Number,
        default:10
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