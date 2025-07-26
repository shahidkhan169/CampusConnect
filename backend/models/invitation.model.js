import mongoose from "mongoose";
import { ADMIN_MODEL, INVITATION_MODEL } from "../constants/model.constants.js";
import { INVITATION_STATUS } from "../constants/status.constants.js";



const invitationSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:INVITATION_STATUS,
        default:INVITATION_STATUS.PENDING
    },
    sendBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:ADMIN_MODEL
    },
    sendAt:{
        type:Date,
        default:Date.now()
    },
    acceptedAt:{
        type:Date
    }
})

export const Invitation=mongoose.model(INVITATION_MODEL,invitationSchema);