const UserModel = require('../models/UserModel');

const ProfileService = {
    getUserData: (id) => {
        return UserModel.findById(id);
    }
}

module.exports = ProfileService;