const express = require('express');
const router = express.Router();

const ProfileService = require('../services/ProfileService');
const ValidationService = require('../services/ValidationService');
 
router.get('/:id', async (req, res) => {
    const user_data = await ProfileService.getUserData(req.params.id);
    res.status(200).json(user_data);
});

router.put('/:id', async (req, res) => {
    let filtered_data = ValidationService.filterFields(req.body, ['username', 'email']);

    try{
        await ProfileService.updateUserData(req.params.id, filtered_data);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;