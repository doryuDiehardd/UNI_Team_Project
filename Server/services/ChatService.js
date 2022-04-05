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
    }
}

module.exports = ChatService;