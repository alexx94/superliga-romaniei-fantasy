import dotenv from 'dotenv';
import express from 'express';
//CORS doar daca frontend face request la API de pe un alt domeniu
const app = express();
app.use(express.json());

import homeRoute from './src/routes/Home.js';
import playerRoute from './src/routes/Players.js';

app.use('/', homeRoute);
app.use('/api', playerRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })
