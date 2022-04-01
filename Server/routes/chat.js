const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    res.sendStatus(200);
});

router.get('/:id', (req, res) => {
    res.sendStatus(200);
});

router.put('/id:', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;