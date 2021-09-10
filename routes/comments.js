const router = require('express').Router();
const _ = require('lodash');
let Comment = require('../models/comment.model');

router.route('/').get((req, res, next) => {
    let query_param = req.query;
    if(!_.isEmpty(query_param)) {
        if(query_param.class_id) {
            let clsId = query_param.class_id;
            Comment.find({clsId})
                .then(comments => res.status(200).send(comments))
                .catch(next);
        } else {
            Comment.find()
                .then(comments => res.status(200).send(comments))
                .catch(next);
        }
    } else {
        Comment.find()
            .then(comments => res.status(200).send(comments))
            .catch(next);
    }
});

router.route('/create').post((req, res, next) => {
    let comment = req.body.comment;
    let clsId = req.body.clsId;
    let contentId = req.body.contentId;
    let userId = req.body.userId;
    let posted_at = req.body.posted_at;

    const newComment = new Comment({
        comment,
        clsId,
        contentId,
        userId,
        posted_at
    });

    newComment.save()
        .then(createdComment => res.status(200).send(createdComment))
        .catch(next);
});

router.route('/:id').get((req, res, next) => {
    Comment.findById(req.params.id)
        .then(comment => res.status(200).send(comment))
        .catch(next);
});

router.route('/:id').delete((req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('Comment deleted.'))
        .catch(next);
});

module.exports = router;