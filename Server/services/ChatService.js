const ChatModel = require('../models/ChatModel');

const ChatService = {
    createChat: async (data) => {
        try{
            await ChatModel.create(data);
        }
        catch(err) { throw err }
    }
}

module.exports = ChatService;