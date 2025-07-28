import express from 'express'
import helmet from 'helmet';
import { router } from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { morganLogger } from './utils/morgan.js';



export const app=express();

app.use(helmet())
app.use(express.json());

app.use(morganLogger);

app.use('/api',router);

app.use(errorHandler);

