const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    pic_path:{
        type: String,
        required: false
    },

    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    messages: [
        {
            msg: {
                type: String,
                required: true
            },
            owner_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            is_edited: {
                type: Boolean,
                default: false
            },
            is_viewed: {
                type: Boolean,
                default: false
            }
        }
    ],

    related_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    kicked_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    join_requests: [
        {
            requester_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

            invited_user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
});

const ChatModel = mongoose.model('ChatModel', chatSchema);
module.exports = ChatModel;