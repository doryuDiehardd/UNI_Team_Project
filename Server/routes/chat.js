const express = require('express');
const router = express.Router();

const ChatService = require('../services/ChatService');
const ValidationService = require('../services/ValidationService');

// @desc create new chat
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

//  @desc get chat by id
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

// @desc delete chat
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

// @desc update chat data
router.put('/:id', async (req, res) => {
    let filtered_data = ValidationService.filterFields(req.body, ['name', 'owner_id']);

    // 
    // Validation
    // 

    if (!Object.keys(filtered_data).length){
        return res.status(422).json({data_err: 'Incorrect / no data provided'});
    }

    // 

    try{
        await ChatService.updateChatData(req.params.id, filtered_data);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

//
// related_users 
//

// @desc add user to related_users array in specific chat
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

// @desc remove user from related_users array in specific chat
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

// @desc add user to kicked_users array in specific chat
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

//  @desc remove user from kicked_users array in specific chat
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

//
// messages
//

// @desc get all messages
router.get('/:id/messages', async (req, res) => {
    let messages;

    try{
        messages = await ChatService.getAllMessages(req.params.id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.status(200).json(messages);
});

// @desc add new message
router.post('/:id/messages', async (req, res) => {
    data = {
        msg: req.body.msg || null,
        owner_id: req.body.owner_id || null
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
        await ChatService.addMessage(req.params.id, data);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

// @desc get specific message
router.get('/:chat_id/messages/:message_id', async (req, res) => {
    let message;
    
    try{
        message = await ChatService.getMessage(req.params.chat_id, req.params.message_id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.status(200).json(message);
});

// @desc edit specific message + mark as edited / mark message as read
router.put('/:chat_id/messages/:message_id', async (req, res) => {
    let filtered_data = ValidationService.filterFields(req.body, ['msg', 'is_viewed']);

    // 
    // Validation
    // 

    if (!Object.keys(filtered_data).length){
        return res.status(422).json({data_err: 'Incorrect / no data provided'});
    }

    // 

    try{
        await ChatService.updateMessage(req.params.chat_id, req.params.message_id, filtered_data);
    }
    catch(err){
        console.log(err);
        return req.sendStatus(500);
    }
    
    res.sendStatus(200);
});

// @desc delete spescific message
router.delete('/:chat_id/messages/:message_id', async (req, res) => {
    try{
        await ChatService.deleteMessage(req.params.chat_id, req.params.message_id);
    }
    catch(err){
        console.log(err);
        return req.sendStatus(500);
    }

    res.sendStatus(200);
});

//

// 
// join_requests
// 

// @desc get all join requests
router.get('/:id/join_requests', async (req, res) => {
    let join_requests;
    
    try{
        join_requests = await ChatService.getAllJoinRequests(req.params.id);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.status(200).json(join_requests);
})

// @desc create join request
router.post('/:id/join_requests', async (req, res) => {
    data = {
        requester_id: req.body.requester_id || null,
        invited_user_id: req.body.invited_user_id || null
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
        await ChatService.addJoinRequest(req.params.id, data);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(200);
});

// @desc get specific join request
router.get('/:chat_id/join_requests/:request_id', async (req, res) => {
    let join_request;
    
    try{
        join_request = await ChatService.getJoinRequest(req.params.chat_id, req.params.request_id);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }

    res.status(200).json(join_request);
});

// @desc accept join request ?
router.put('/:chat_id/join_requests/:request_id', (req, res) => {
    // Route under consideration
    // Add 'status' field? (requested, seen, accepted)
    res.sendStatus(200);
});

// @desc delete specific join request
router.delete('/:chat_id/join_requests/:request_id', async (req, res) => {
    try{
        await ChatService.deleteJoinRequest(req.params.chat_id, req.params.request_id);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }

    res.sendStatus(200);
});

module.exports = router;