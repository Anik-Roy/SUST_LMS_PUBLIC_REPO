const router = require('express').Router();
const _ = require('lodash');
let ClassContent = require('../models/class_content.model');

router.route('/').get((req, res, next) => {
    let query_param = req.query;
    if(!_.isEmpty(query_param)) {
        if(query_param.class_id) {
            let classId = query_param.class_id;
            ClassContent.find({classId})
                .then(class_contents => res.status(200).send(class_contents))
                .catch(next);
        } else {
            ClassContent.find()
                .then(class_contents => res.status(200).send(class_contents))
                .catch(next);
        }
    } else {
        ClassContent.find()
            .then(class_contents => res.status(200).send(class_contents))
            .catch(next);
    }
});

router.route('/create').post((req, res, next) => {
    let rawText = req.body.rawText;
    let attachedFileUrls = req.body.attachedFileUrls;
    let classId = req.body.classId;
    let userId = req.body.userId;
    let posted_at = req.body.posted_at;

    const newClassContent = new ClassContent({
        rawText,
        attachedFileUrls,
        classId,
        userId,
        posted_at
    });

    newClassContent.save()
        .then(createdClassContent => res.status(200).send(createdClassContent))
        .catch(next);
});

router.route('/:id').get((req, res, next) => {
    ClassContent.findById(req.params.id)
        .then(class_content => res.status(200).send(class_content))
        .catch(next);
});

router.route('/:id').delete((req, res, next) => {
    ClassContent.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('Class content deleted.'))
        .catch(next);
});

module.exports = router;