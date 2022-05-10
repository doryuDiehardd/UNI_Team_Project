const router = require('express').Router();

const axios = require('axios').default;

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    axios.post('http://localhost:5000/auth/register',{
        ...req.body
    })
    .then(response => {
        res.send(response.status);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;