import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DBError } from '../utils/errors.js';


dotenv.config()

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongDB connected")
    }
    catch(err){
        console.log(err.message);
        throw new DBError("Database Connection Error");
    }
};
