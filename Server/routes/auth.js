const express = require('express');
const router = express.Router();

const passport = require('passport');

const AuthService = require('../services/AuthService');
const ValidationService = require('../services/ValidationService');
const UserExistsException = require('../services/exceptions/UserExistsException');

router.post('/register', async (req, res) => {
    data = {
        username: req.body.username ? req.body.username : null,
        pic_path: 'placeholder',
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }

    //
    // Validation
    //

    const errors = ValidationService.validateData_IsAllFilled(data);
    if (Object.keys(errors).length){
        return res.json(errors).status(422);
    }

    if (!ValidationService.validateEmail(data.email)){
        return res.json({ email_err: 'Invalid email' }).status(422);
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
    
    res.sendStatus(200);
});

router.post('/login', (req, res, next) => {
    data = {
        username: req.body.username ? req.body.username : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }

    //
    // Validation
    //

    const errors = ValidationService.validateData_IsAllFilled(data);
    if (Object.keys(errors).length){
        return res.json(errors).status(422);
    }

    if (!ValidationService.validateEmail(data.email)){
        return res.json({ email_err: 'Invalid email' }).status(422);
    }

    //

    passport.authenticate('local', function(err, user, info){
        if (err) { return next(err) }

        if (!user) {
            return res
                .json({ login_err: 'Wrong credentials were entered' })
                .status(422);
        }

        req.login(user, loginErr => {
            if (loginErr){
                return next(loginErr);
            }
            return res.sendStatus(200);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

router.post('/password-recover', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;