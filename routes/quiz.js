const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let readFile = (filename) => JSON.parse(fs.readFileSync(filename))
let writeFile = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data))

// TODO:  Define dynamic routes
// Mission 2 - Read
router.get('/', (req, res) => {
    let quizes = readFile('data/quizes.json');
    res.send(quizes)
})

// Mission 3 - Create
router.post('/', (req, res) => {
    let quizes = readFile('data/quizes.json');
    let questions = req.body.title;
    let answer_a = req.body.choiceA;
    let answer_b = req.body.choiceB;
    let answer_c = req.body.choiceC;
    let answer_d = req.body.choiceD;
    let correctAnswer = req.body.correct;
    let new_question = {"question":questions,"answer":{"answer_a":answer_a,"answer_b":answer_b,"answer_c":answer_c,"answer_d":answer_d},"correctAnswer":correctAnswer};
    console.log(questions);
    quizes.push(new_question);
    writeFile('data/quizes.json', quizes);
    res.send("SUCCESS");
})

// Mission 4 - Delete Quiz
router.delete('/:id', (req, res) => {
    let quizes = readFile('data/quizes.json');
    let id = req.params.id
    console.log(id);
    let index = quizes.findIndex(quiz => quiz.id === id)
    if (index !== -1) {
        quizes.splice(index, 1)
        writeFile('data/quizes.json', quizes);
        res.status(200).send({ "message": 'Quiz deleted successfully' })
    } else {
        res.status(404).send({ "message": 'qusetion id not found' })
    }
})

// Mission 5 - Update Quiz
router.patch('/:id', (req, res) => {
    let quizes = readFile('data/quizes.json');
    let id = req.params.id
    let index = quizes.findIndex(quiz => quiz.id === id)
    if (index !== -1) {
        let quiz = quizes[index]
        if (req.body.question !== undefined) {
            quiz.question = req.body.question
        }
        if (req.body.answers !== undefined) {
            quiz.answers = req.body.answers
        }
        if (req.body.correctAnswer !== undefined) {
            quiz.correctAnswer = req.body.correctAnswer
        }
        res.status(200).send({ "message": 'answer updated successfully' })
    } else {
        res.status(404).send({ "message": 'answer id not found' })
    }
    writeFile('data/quizes.json', quizes);
})

module.exports = router