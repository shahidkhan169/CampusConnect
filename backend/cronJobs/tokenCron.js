import nodeCron from "node-cron";
import { Student } from "../models/student.model.js";
import { Alumni } from "../models/alumni.model.js";


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

nodeCron.schedule('0 0 */4 * *', async () => {
  try {
    await Alumni.updateMany({},{
      maxToken:10
    })
  } catch (error) {
    console.error('Token reset failed:', error);
  }
});