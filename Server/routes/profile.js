const express = require('express');
const router = express.Router();

const ProfileService = require('../services/ProfileService');

router.get('/:id', async (req, res) => {
    const user_data = await ProfileService.getUserData(req.params.id);
    res.status(200).json(user_data);
});

router.put('/:id', (req, res) => {
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;