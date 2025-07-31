import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { morganLogger } from './utils/morgan.js';



export const app=express();

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(helmet())
app.use(express.json());

app.use(morganLogger);

app.use('/api',router);

app.use(errorHandler);

