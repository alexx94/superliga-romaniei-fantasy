import validatePlayerRequest from '../src/middleware/playerValidationMiddleware.js';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json()); 

// Testing if the User's input is a valid player that can be found in our database

// I can also implement other validaiton, like make sure games_started <= games etc.

const testPlayer = {
    player: "John Doe",
    team: "SCM-Gloria-Buzau",
    age: 25,
    games: 10,
    games_starts: 8,
    minutes: 900,
    goals: 5,
    assists: 2,
    goals_pens: 1,
    pens_made: 0,
    cards_yellow: 1,
    cards_red: 0,
    nation: "Romania"
}; 

app.post('/test', validatePlayerRequest, (req, res) => {
    res.send('OK');
});

request(app)
    .post('/test')
    .send(testPlayer)
    .expect(200)
    .end((err, res) => {
        if (err) console.log(err + ' - ' + JSON.stringify(res.body, null, 2));
        else console.log('Middleware status: ', res.text); 
    });