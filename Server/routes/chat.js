const express = require('express');
const router = express.Router();

const ChatService = require('../services/ChatService');
const ValidationService = require('../services/ValidationService');

router.post('/create', async (req, res) => {
    data = {
        name: req.body.name || null,
        pic_path: 'placeholder',
        owner_id: req.body.owner_id || null,
        messages: [],
        related_users: req.body.owner_id ? [ req.body.owner_id ] : null,
        kicked_users: [],
        join_requests: []
    }

    //
    // Validation
    //

    const errors = ValidationService.validateData_IsAllFilled(data);
    if (Object.keys(errors).length){
        return res.status(422).json(errors);
    }
    //

    try{
        await ChatService.createChat(data);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

router.get('/:id', async (req, res) => {
    let chat_data;

    try{
        chat_data = await ChatService.getChatData(req.params.id);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }

    res.status(200).json(chat_data);
});

router.put('/:id', (req, res) => {
    res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
    try{
        await ChatService.deleteChat(req.params.id);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    
    res.sendStatus(200);
});

module.exports = router;