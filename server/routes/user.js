const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10)
            .then(hashPassword => {
                const user = new User({
                    email: req.body.email,
                    password: hashPassword
                });
                console.log("User:", user);
                user.save()
                    .then(result => {
                        console.log("Result:", result);
                        res.status(201).json({
                            message: 'User created Successfully!',
                            result: result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            });
    } catch (e) {
        console.log(e)
    }
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    // find weather the user exist or not
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Auth failed.'
            });
        }
        fetchedUser = user;
        console.log("user:", user)
        return bcrypt.compare(req.body.password, user.password);
    })
        .then(result => {
            // if result is false
            console.log("result:", result);
            if (!result) {
                return res.status(401).json({
                    message: "Password doesn't match."
                })
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                'secret_key_from_env',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600
            })
        })
        .catch(err => {
            res.status(401).json({
                message: "Password doesn't match.",
                error: err
            })
        })
});


module.exports = router;