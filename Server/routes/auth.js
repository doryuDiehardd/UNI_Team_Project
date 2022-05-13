const express = require('express');
const router = express.Router();

const passport = require('passport');

const AuthService = require('../services/AuthService');
const ValidationService = require('../services/ValidationService');
const UserExistsException = require('../services/exceptions/UserExistsException');

router.post('/register', async (req, res) => {
    data = {
        username: req.body.username || null,
        pic_path: 'placeholder',
        email: req.body.email || null,
        password: req.body.password || null
    }

    //
    // Validation
    //

    const errors = ValidationService.validateData_IsAllFilled(data);
    if (Object.keys(errors).length){
        return res.status(422).json(errors);
    }

    if (!ValidationService.validateEmail(data.email)){
        return res.status(422).json({ email_err: 'Invalid email' });
    }

    //

    try{
        await AuthService.registerUser(data);
    }
    catch (err) {
        if (err instanceof UserExistsException){
            return res.status(400).json({ registration_err: err.msg });
        }
        else{
            console.log(err);
            res.sendStatus(500);
        }
    }

    res.status(200).json(req.user);
});

router.post('/login', (req, res, next) => {
    data = {
        username: req.body.username || null,
        email: req.body.email || null,
        password: req.body.password || null
    }

    //
    // Validation
    //

    const errors = ValidationService.validateData_IsAllFilled(data);
    if (Object.keys(errors).length){
        return res.status(422).json(errors);
    }

    if (!ValidationService.validateEmail(data.email)){
        return res.status(422).json({ email_err: 'Invalid email' });
    }

    //

    passport.authenticate('local', function(err, user, info){
        if (err) { return next(err) }

        if (!user) {
            return res
                .status(422)
                .json({ login_err: 'Wrong credentials were entered' });
        }

        req.login(user, loginErr => {
            if (loginErr){
                return next(loginErr);
            }
            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

router.post('/password-recover', (req, res) => {
    // Feature under consideration
    res.sendStatus(200);
});

module.exports = router;