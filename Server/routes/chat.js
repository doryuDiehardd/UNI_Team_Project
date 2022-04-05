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

router.delete('/:id', async (req, res) => {
    try{
        await ChatService.deleteChat(req.params.id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
    
    res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
    let filtered_data = ValidationService.filterFields(req.body, ['name', 'owner_id']);

    try{
        await ChatService.updateChatData(req.params.id, filtered_data);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    // TODO add/remove related users
    // TODO add/remove kicked users users

    res.sendStatus(200);
});

//
// related_users 
//

router.put('/:id/related_users', async (req, res) => {
    if (req.body.new_related_user_id === undefined){
        return res.status(422).json({related_user_err: 'new_related_user_id field expected'});
    }

    try{
        await ChatService.addRelatedUser(req.params.id, req.body.new_related_user_id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

router.delete('/:chat_id/related_users/:user_id', async (req, res) => {
    try{
        await ChatService.removeRelatedUser(req.params.chat_id, req.params.user_id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
    
    res.sendStatus(200);
});

//

//
// kicked_users
//

router.put('/:id/kicked_users', async (req, res) => {
    if (req.body.new_kicked_user_id === undefined){
        return res.status(422).json({kicked_user_err: 'new_kicked_user_id field expected'});
    }

    try{
        await ChatService.addKickedUser(req.params.id, req.body.new_kicked_user_id)
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

router.delete('/:chat_id/kicked_users/:user_id', async (req, res) => {
    try{
        await ChatService.removeKickedUser(req.params.chat_id, req.params.user_id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

//




//* @route GET /messages
//* @desc get all messages

//* @route POST /messages
//* @desc add new message

//* @route GET /messages/:id
//* @desc get specific message

//* @route PUT /messages/:id
//* @desc edit specific message + mark as edited / mark message as read

//* @route DELETE /messages/:id
//* @desc delete spescific message


//* @route GET /join_requests
//* @desc get all join requests

//* @route POST /join_requests
//* @desc create join request

// * @route GET /join_requests/:id
// * @desc get specific join request


//* @route PUT /join_requests/:id
//* @desc accept join request

//* @route DELETE /join_requests/:id
//* @desc delete specific join request


module.exports = router;