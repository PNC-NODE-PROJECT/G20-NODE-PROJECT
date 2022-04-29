require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());// To read json data in request body

app.listen(PORT, () => console.log('Server Start on :' + PORT));
app.use(express.static('public'));


const quizes = require('./routes/quiz.js');

app.use('/api/quiz', quizes);