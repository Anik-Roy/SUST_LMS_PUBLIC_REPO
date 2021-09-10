const router = require('express').Router();
const _ = require('lodash');
let AssignmentResponse = require('../models/assignment_response.model');

router.route('/').get((req, res, next) => {
    let query_param = req.query;
    
    if(!_.isEmpty(query_param)) {
        if(query_param.user_id) {
            let user_id = query_param.user_id;
            AssignmentResponse.find({user_id})
                .then(assignment_responses => res.status(200).send(assignment_responses))
                .catch(next);
        } else if(query_param.assignment_id) {
            let assignment_id = query_param.assignment_id;
            AssignmentResponse.find({assignment_id})
                .then(assignment_responses => res.status(200).send(assignment_responses))
                .catch(next);
        } else {
            AssignmentResponse.find()
                .then(assignment_responses => res.status(200).send(assignment_responses))
                .catch(next);
        }
    } else {
        AssignmentResponse.find()
            .then(assignment_responses => res.status(200).send(assignment_responses))
            .catch(next);
    }
});

router.route('/create').post((req, res, next) => {
    let assignmentFileUrl = req.body.assignmentFileUrl;
    let marks = req.body.marks;
    let name = req.body.name;
    let type = req.body.type;
    let user_id = req.body.user_id;
    let assignment_id = req.body.assignment_id;

    const newAssignmentResponse = new AssignmentResponse({
        assignmentFileUrl,
        marks,
        name,
        type,
        user_id,
        assignment_id
    });

    newAssignmentResponse.save()
        .then(createdAssignmentResponse => res.status(200).send(createdAssignmentResponse))
        .catch(next);
});

// router.route('/:id').get((req, res, next) => {
//     Quiz.findById(req.params.id)
//         .then(quiz_details => res.status(200).send(quiz_details))
//         .catch(next);
// });

router.route('/update/:id').patch((req, res, next) => {
    console.log(req.body);
    AssignmentResponse.findById(req.params.id)
        .then(assignment_response_details => {
            assignment_response_details.marks = req.body.marks;
            assignment_response_details.save()
                .then(updatedAssignmentResponse => res.status(200).send(updatedAssignmentResponse))
                .catch(next);
        })
        .catch(next);
});

module.exports = router;