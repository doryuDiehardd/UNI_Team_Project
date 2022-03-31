const mongoose = require('mongoose');
const ChatDB = require('../config/keys').MongoChatDBURI;
mongoose.connect(ChatDB)
.then(() => console.log('Connected to chat db'))
.catch((err) => console.log(err));

const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');



const user_model_test = async () => {
    user_data = {
        user_name: 'UName',
        pic_path: 'placeholder',
        email: 'placeholder',
        password: 'placeholder'
    }

    await UserModel.create(user_data);
    console.log('New User created');
}

//*  user_model_test();



const chat_model_test = async () => {
    const owner_user = await UserModel.findOne({user_name: 'UName'});

    // console.log(owner_user);
    // console.log(typeof owner_user);
    // console.log(owner_user.user_name);
    // console.log(owner_user._id);

    chat_data = {
        name: 'ChatName',
        pic_path: 'placeholder',
        owner_id: owner_user._id,
        messages: [],
        related_users: [ owner_user._id ],
        kicked_users: [],
        join_requests: []
    }

    // console.log(chat_data);

    try{
        await ChatModel.create(chat_data);
        console.log('New chat created');
    }
    catch (err) {
        console.log(err);
    }
}

//* chat_model_test();


