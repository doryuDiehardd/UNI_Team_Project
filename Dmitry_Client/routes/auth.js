const router = require('express').Router();

const axios = require('axios').default;

router.get('/register', (req, res) => {
    res.render('register_login', {
        route: 'register'
    });
});

router.post('/register', (req, res) => {
    axios.post('/auth/register',{
        ...req.body
    })
    .then(response => {
        if (response.status === 200){
            res.redirect('/');
        }
        else{
            res.sendStatus(response.status);
        }
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/login', (req, res) => {
    res.render('register_login', {
        route: 'login'
    });
});

router.post('/login', (req, res) => {
    axios.post('/auth/login', {
        ...req.body
    })
    .then(response => {
        if (response.status === 200){
            res.redirect('/')
        }
        else{
            res.sendStatus(response.status);
        }
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;