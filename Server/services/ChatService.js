const ChatModel = require('../models/ChatModel');

const ChatService = {
    createChat: (data) => {
        return ChatModel.create(data);
    },
    
    getChatData: (id) => {
        return ChatModel.findById(id);
    }
}

module.exports = ChatService;