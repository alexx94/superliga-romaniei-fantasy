import dotenv from 'dotenv';
import express from 'express';
//CORS doar daca frontend face request la API de pe un alt domeniu
const app = express();
app.use(express.json());

//TODO: Global error handler for all routes later on

import homeRoute from './src/routes/Home.js';
import playerRoute from './src/routes/Players.js';
import authRoute from './src/routes/Auth.js';

app.use('/', homeRoute);
app.use('/api', playerRoute);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })
