const router = require('express').Router();
const _ = require('lodash');
let Quiz = require('../models/quiz.model');

router.route('/').get((req, res, next) => {
    let query_param = req.query;
    if(!_.isEmpty(query_param)) {
        if(query_param.class_id) {
            let class_id = query_param.class_id;
            Quiz.find({class_id})
                .then(quizzes => res.status(200).send(quizzes))
                .catch(next);
        } else {
            Quiz.find()
                .then(quizzes => res.status(200).send(quizzes))
                .catch(next);
        }
    } else {
        Quiz.find()
            .then(quizzes => res.status(200).send(quizzes))
            .catch(next);
    }
});

router.route('/create').post((req, res, next) => {
    let title = req.body.title;
    let instruction = req.body.instruction;
    let quiz_questions = req.body.quiz_questions;
    let startingDate = req.body.startingDate;
    let acceptingQuiz = req.body.acceptingQuiz;
    let author_id = req.body.author_id;
    let class_id = req.body.class_id;

    const newQuiz = new Quiz({
        title,
        instruction,
        quiz_questions,
        startingDate,
        acceptingQuiz,
        author_id,
        class_id
    });

    newQuiz.save()
        .then(createdQuiz => res.status(200).send(createdQuiz))
        .catch(next);
});

router.route('/:id').get((req, res, next) => {
    Quiz.findById(req.params.id)
        .then(quiz_details => res.status(200).send(quiz_details))
        .catch(next);
});

router.route('/update/:id').patch((req, res, next) => {
    Quiz.findById(req.params.id)
        .then(quiz_details => {
            quiz_details.quiz_questions = req.body.quiz_questions;

            quiz_details.save()
                .then(updatedQuiz => res.status(200).send(updatedQuiz))
                .catch(next);
        })
        .catch(next);
});

router.route('/update-accepting-response/:id').patch((req, res, next) => {
    Quiz.findById(req.params.id)
        .then(quiz_details => {
            quiz_details.acceptingQuiz = req.body.acceptingQuiz;

            quiz_details.save()
                .then(updatedQuiz => res.status(200).send(updatedQuiz))
                .catch(next);
        })
        .catch(next);
});

module.exports = router;