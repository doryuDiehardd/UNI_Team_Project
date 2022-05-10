const router = require('express').Router();

const axios = require('axios').default;

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;