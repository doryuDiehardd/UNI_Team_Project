const { findOneAndUpdate } = require('../models/ChatModel');
const ChatModel = require('../models/ChatModel');

const ChatService = {
    createChat: (data) => {
        return ChatModel.create(data);
    },
    
    getChatData: (id) => {
        return ChatModel.findById(id);
    },

    deleteChat: (id) => {
        return ChatModel.deleteOne({'_id': id});
    },

    updateChatData: (id, data) => {
        return ChatModel.findOneAndUpdate({'_id': id}, {'$set': data});
    },
    

    addRelatedUser: (chat_id, user_id) => {
        return ChatModel.findOneAndUpdate({'_id': chat_id}, {'$push': {related_users: user_id}});
    },

    removeRelatedUser: (chat_id, user_id) => {
        return ChatModel.findOneAndUpdate({'_id': chat_id}, {'$pull': {related_users: user_id}});
    },


    addKickedUser: (chat_id, user_id) => {
        return ChatModel.findOneAndUpdate({'_id': chat_id}, {'$push': {kicked_users: user_id}});
    },
    
    removeKickedUser: (chat_id, user_id) => {
        return ChatModel.findOneAndUpdate({'_id': chat_id}, {'$pull': {kicked_users: user_id}});
    },


    getAllMessages: async function(chat_id){
        let chat;
        
        try{
            chat = await this.getChatData(chat_id);
        }
        catch(err) { throw err }

        return chat.messages;
    },

    addMessage: (chat_id, message) => {
        return ChatModel.findOneAndUpdate({'_id': chat_id}, {'$push': {messages: message}});
    },

    getMessage: async (chat_id, message_id) => {
        let data;

        try{
            data = await ChatModel.findOne({'messages._id': message_id});
        }
        catch(err) { throw err }

        return data.messages[0];
    },

    updateMessage: async function(chat_id, message_id, data){
        let message_data;
        
        // $set replaces whole object, so have to use old message to keep the data
        try{
            message_data = await this.getMessage(chat_id, message_id);
        }
        catch(err) { throw err }

        if (data.msg){
            message_data.msg = data.msg;
            message_data.is_edited = true;
        }
        if (data.is_viewed){
            message_data.is_viewed = data.is_viewed;
        }

        return ChatModel.findOneAndUpdate({'messages._id': message_id}, {'$set': {'messages.$': message_data}});
    },

    deleteMessage: (chat_id, message_id) => {
        return ChatModel.findOneAndUpdate({'_id': chat_id}, {'$pull': {'messages': {'_id': message_id}}});
    }
}

module.exports = ChatService;