import dotenv from 'dotenv';
import homeRoute from '../src/routes/Home.js';
import playerRoute from '../src/routes/Players.js';
import authRoute from '../src/routes/Auth.js';
import express, { application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


//CORS doar daca frontend face request la API de pe un alt domeniu
const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {
    origin: FRONTEND_URL, // domeniul de CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO: Global error handler for all routes later on

app.use('/api', playerRoute);
app.use('/auth', authRoute);

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })

export default app;