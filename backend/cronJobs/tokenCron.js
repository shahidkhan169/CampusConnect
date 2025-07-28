import nodeCron from "node-cron";
import { Student } from "../models/student.model.js";


nodeCron.schedule('0 0 1 * *', async () => {
  try {
    await Student.updateMany({}, {
      tokensRemaining: 5,
      lastTokenReset: new Date()
    });
    console.log('Monthly tokens reset for all students');
  } catch (error) {
    console.error('Token reset failed:', error);
  }
});