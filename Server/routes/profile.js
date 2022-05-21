const express = require('express');
const router = express.Router();

const ProfileService = require('../services/ProfileService');
const ValidationService = require('../services/ValidationService');

// @desc get user by id
router.get('/:id', async (req, res) => {
    let user_data;
    
    try{
        user_data = await ProfileService.getUserData(req.params.id);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }

    res.status(200).json(user_data);
});

// @desc get user by name
router.get('/by_name/:name', async (req, res) => {
    try{
        let users = await ProfileService.getByName(req.params.name);
        res.status(200).json(users);
    }
    catch (err){
        console.log(err);
        res.sendStatus(500);
    }
});

// @desc update user by id
router.put('/:id', async (req, res) => {
    let filtered_data = ValidationService.filterFields(req.body, ['username', 'email']);

    // 
    // Validation
    // 

    if (!Object.keys(filtered_data).length){
        return res.status(422).json({data_err: 'Incorrect / no data provided'});
    }

    // 

    try{
        await ProfileService.updateUserData(req.params.id, filtered_data);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

// @delete user by id
router.delete('/:id', async (req, res) => {
    try{
        await ProfileService.deleteUser(req.params.id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

module.exports = router;