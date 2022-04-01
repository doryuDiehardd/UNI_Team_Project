const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    
    pic_path:{
        type: String,
        required: false
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },
});

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;