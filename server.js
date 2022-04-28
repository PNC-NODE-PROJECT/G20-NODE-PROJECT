require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());

app.listen(PORT, () => console.log('Server Start on :' + PORT));

const quizes = require('./routes/quiz.js');


app.use('/api/quiz', quizes);