import dotenv from 'dotenv';
import express, { application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ServerlessHttp from 'serverless-http'; 

//CORS doar daca frontend face request la API de pe un alt domeniu
const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {
    origin: FRONTEND_URL, // domeniul de CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//TODO: Global error handler for all routes later on

import homeRoute from '../src/routes/Home.js';
import playerRoute from '../src/routes/Players.js';
import authRoute from '../src/routes/Auth.js';

app.use('/', homeRoute);
app.use('/api', playerRoute);
app.use('/auth', authRoute);

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })

export const handler = ServerlessHttp(app);