const router = require('express').Router();
let User = require('../models/user.model');
let jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");

const DOMAIN = 'YOUR_MAILGUN_DOMAIN';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

router.route('/email-activate').post((req, res, next) => {
    const {token} = req.body;
    if(token) {
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, (error, decodedToken) => {
            if(error) {
                return res.status(400).send({"error": "Incorrect or expired link."});
            }
            const {fullName, email, isTeacher, universityId, password} = decodedToken;

            User.findOne({email}).exec((err, user) => {
                if(err) {
                    return res.status(400).send({"error": err.message});
                }
                if(user) {
                    return res.status(400).send({"error": "An user with this email is already exist."});
                }
                const newUser = new User({fullName, email, isTeacher, universityId, password});

                newUser.save()
                    .then((newUser) => res.status(201).send(newUser))
                    .catch(next);
            });
        });
    } else {
        return res.status(400).send({"error": "Something went wrong!"});
    }
});

router.route('/').get((req, res, next) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
    User.find()
        .then(users => res.status(200).send(users))
        .catch(next);
});

router.route('/signup').post((req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const fullName = req.body.fullName ? req.body.fullName : "";
    const universityId = req.body.universityId ? req.body.universityId : "";
    const isTeacher = req.body.isTeacher;
    const password = req.body.password;

    console.log(email, fullName, universityId, isTeacher, password);

    const newUser = new User({fullName, email, universityId, isTeacher, password});

    const token = jwt.sign({email, fullName, universityId, isTeacher, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: "1h"});

    const data = {
        from: 'Email verification <noreply@sustlms.edu>',
        to: email,
        subject: 'Email verification link',
        html: `
            <div>
                <h2>Please click on the below link to activate your account.</h2>
                <p>${process.env.CLIENT_URL}/login?mode=verifyEmail&token=${token}</p>
            </div>
        `
    };
    mg.messages().send(data, function (error, body) {
        if(error) {
            console.log(error);
            return res.status(400).send({"error": error.message})
        }
        console.log(body);
        return res.status(200).send({"message": "Email has been sent! Please check your email account."});
    });

    // newUser.save()
    //     .then((newUser) => res.status(201).send(newUser))
    //     .catch(next);
});

router.route('/signin').post((req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);

    User.findOne({email, password}).exec((err, user) => {
        if(err) {
            return res.status(400).send({"error": err.message});
        }
        if(user) {
            const fullName = user.fullName;
            const universityId = user.universityId;
            const isTeacher = user.isTeacher;

            const token = jwt.sign({email, fullName, universityId, isTeacher, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: "1h"});

            return res.status(200).send({...user._doc, token});
        } else {
            return res.status(400).send({"error": "No account found with the given credentials."});
        }
    });
});

router.route('/:id').get((req, res, next) => {
    // User.findById(req.params.id)
    //   .then(user => res.json(user))
    //   .catch(err => res.status(400).json('Error: ' + err));
    User.findById(req.params.id)
      .then(user => res.status(200).send(user))
      .catch(next);
});
  
router.route('/:id').delete((req, res, next) => {
    // User.findByIdAndDelete(req.params.id)
    //     .then(() => res.json('User deleted.'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('User deleted.'))
        .catch(next);
});

router.route('/update/:id').patch((req, res, next) => {
    // User.findById(req.params.id)
    //     .then(user => {
    //         user.username = req.body.username; 

    //         user.save()
    //             .then(() => res.json('user updated!'))
    //             .catch(err => res.status(400).json('Error: ' + err));
    //         })
    //         .catch(err => res.status(400).json('Error: ' + err));
    console.log('update profile > ', req.body);
    User.findById(req.params.id)
        .then(user => {
                user.fullName = req.body.fullName ? req.body.fullName : user.fullName;
                user.universityId = req.body.universityId ? req.body.universityId : user.universityId;
                user.mobileNo = req.body.mobileNo ? req.body.mobileNo : user.mobileNo; 
                
                user.save()
                    .then(udpatedUser => res.status(200).send(udpatedUser))
                    .catch(next);
            }
        )
        .catch(next);
});

module.exports = router;