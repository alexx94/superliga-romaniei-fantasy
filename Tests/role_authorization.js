import authorizeRoles from "../src/middleware/authMiddleware.js";
import express from 'express';
import request from 'supertest';
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser()); 

// Testing if the authorization middleware works to grant access to a route based on roles

const mockToken = '' // mock token to check the middleware with, not a real one

app.get('/test', authorizeRoles(['admin']), (req, res) => {
    res.send('OK');
});

request(app)
    .get('/test')
    .set('Cookie', `sb-jwt=${mockToken}`)
    .expect(200)
    .end((err, res) => {
        if (err) console.log(err + ' - ' + res.status);
        else console.log('Middleware status: ', res.text); 
    });