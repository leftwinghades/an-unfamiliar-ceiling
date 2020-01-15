const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')

const checks = require('./validation-checks');
const dbUser = require('../db/user.js');

// router.get('/', (req, res) => {
//     res.json({
//         message: 'on localhost/auth'
//     });
// });

router.post('/signup', (req, res, next) => {
    if (checks.isValidUser(req.body)) { // returns true if details entered are vaild
        dbUser.getOneByUsername(req.body.username).then(user => {
            if (!user) { // returns true if user is undefined (not in use)
                bcrypt.hash(req.body.password, 12).then((hash) => {
                    const userDetails = { 
                        username: req.body.username,
                        password: hash,
                        date_created: new Date(),
                        ip_when_created: req.ip,
                    };
                    dbUser.createUser(userDetails).then(() => {
                        res.json({
                            message: 'User created. Proceed to login.'
                        });
                    });
                });
            } else {
                next(new Error('This username is already in use.'));
            };
        });
    } else {
        next(new Error('Entered details do not meet the sign up requirements.'));
    };
});

router.post('/login', (req, res, next) => {
    if (checks.isValidUser(req.body)) { // returns true if details entered are vaild
        dbUser.getOneByUsername(req.body.username).then(user => {
            if (user) { // if a user is found with a matching username
                bcrypt.compare(req.body.password, user.password).then((result) => {
                    if (result) { // if passwords match
                        const userDetails = { 
                            id: user.id,
                            date_of_last_visit: new Date(),
                            ip_of_last_visit: req.ip,
                        };
                        dbUser.updateLastVisit(userDetails).then(() => {
                            const token = jwt.sign({
                                username: user.username,
                                userId: user.id
                            }, 
                            process.env.JWT_KEY, 
                            {
                                expiresIn: '12h'
                            });
                            res.cookie('jwtToken', token, {
                                httpOnly: true,
                                sameSite: "lax",
                                // secure: true
                            });
                            res.json({
                                message: 'Logged in.',
                                // token: token
                            });
                        });
                    } else {
                        next(new Error('Invalid login details.'));
                    };
                });
            } else {
                next(new Error('Invalid login details.'));
            };
        });
    } else {
        next(new Error('Invalid login details.'));
    };
});

router.get('/logout', (req, res, next) => {
    if (req.cookies) {
        res.clearCookie('jwtToken');
        // res.json({
        //     message: 'Logged out.',
        // });
        res.redirect('../')
    } else {
        console.log("elsed")
        next(new Error('You are not logged in.'));
    };
});

module.exports = router;