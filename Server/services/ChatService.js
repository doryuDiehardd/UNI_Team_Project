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
    }
}

module.exports = ChatService;