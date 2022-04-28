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

router.post('/', (req, res) => {
    let quizes = readFile('quizes.json');
    let questions = req.body.question;
    let answers = req.body.answers;
    if (req.body.questions !== questions && req.body.answers !== undefined ) {
        let quiz = {
            'id' : uuidv4(),
            "question":questions,
            "answers":answers,
            "correct":"bb"
        }
        quizes.push(quiz);
        writeFile('quizes.json', quizes);
        res.status(201).send({"message" : 'Quiz added successfully'})
    } else {
        res.status(500).send({"message" : 'All field required'});
    }
})



















// router.delete('/:id', (req, res) => {
//    let id = req.params.id
//    let index = quizes.findIndex(quiz => quiz.id === id)
//    if (index !== -1) {
//     quizes.splice(index, 1)
//        res.status(200).send({"message" : 'Item deleted successfully'})
//    } else {
//     res.status(404).send({"message" : 'Item id not found'})
//    }
// })

// router.patch('/:id', (req, res) => {
//     let id = req.params.id
//     let index = quizes.findIndex(quiz => quiz.id === id)
//     if (index !== -1) {
//         let quiz = quizes[index]
//         if (req.body.name !== undefined) {
//             item.name = req.body.name
//         }
//         if (req.body.price !== undefined) {
//             quiz.price = req.body.price
//         }
//         res.status(200).send({"message" : 'Item updated successfully'})
//     } else {
//      res.status(404).send({"message" : 'Item id not found'})
//     }
// })

module.exports = router