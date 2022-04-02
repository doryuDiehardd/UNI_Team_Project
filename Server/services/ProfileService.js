
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/UserModel');

const ProfileService = {
    getUserData: (id) => {
        return UserModel.findById(id);
    },

    updateUserData: (id, data) =>{
        return UserModel.findOneAndUpdate({"_id": id}, {"$set": data});
    },

    deleteUser: (id) => {
        return UserModel.deleteOne({"_id": id});
    }
}

module.exports = ProfileService;