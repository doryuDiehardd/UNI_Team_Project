const express = require('express');
const router = express.Router();

const AuthService = require('../services/AuthService');
const ValidationService = require('../services/ValidationService');

router.post('/register', async (req, res) => {
    data = {
        user_name: req.body.user_name ? req.body.user_name : null,
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
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

});

router.post('/login', (req, res) => {
    res.sendStatus(200);
});

router.get('/logout', (req, res) => {
    res.sendStatus(200);
});

router.post('/password-recover', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;