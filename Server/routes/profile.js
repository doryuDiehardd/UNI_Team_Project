const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.sendStatus(200);
});

router.put('/:id', (req, res) => {
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;