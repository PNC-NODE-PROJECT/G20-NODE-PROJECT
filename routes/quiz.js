const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let readFile = (filename) => JSON.parse(fs.readFileSync(filename))
let writeFile = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data))

router.get('/', (req, res) => {
    let quizes = readFile('quizes.json');
    res.send(quizes)
})

//add quizes 
router.post('/', (req, res) => {
    let quizes = readFile('quizes.json');
    let questions = req.body.question;
    let correctAnswer = req.body.correctAnswer;
    let answers = req.body.answers;
    if (req.body.questions !== questions && req.body.answers !== undefined) {
        let quiz = {
            'id': uuidv4(),
            "question": questions,
            "answers": answers,
            "correctAnswer": correctAnswer
        }
        quizes.push(quiz);
        writeFile('quizes.json', quizes);
        res.status(201).send({ "message": 'Quiz added successfully' })
    } else {
        res.status(500).send({ "message": 'All field required' });
    }
})

//removeQuestion
router.delete('/:id', (req, res) => {
    let quizes = readFile('quizes.json');
    let id = req.params.id
    console.log(id);
    let index = quizes.findIndex(quiz => quiz.id === id)
    if (index !== -1) {
        quizes.splice(index, 1)
        writeFile('quizes.json', quizes);
        res.status(200).send({ "message": 'Quiz deleted successfully' })
    } else {
        res.status(404).send({ "message": 'qusetion id not found' })
    }
})

//updated quizes
router.patch('/:id', (req, res) => {
    let quizes = readFile('quizes.json');
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
    writeFile('quizes.json', quizes);
})

module.exports = router