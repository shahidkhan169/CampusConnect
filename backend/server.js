import { app } from "./app.js";
import { connectDB } from "./config/db.config.js";



await connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`server connected at port ${process.env.PORT}`);
})

    