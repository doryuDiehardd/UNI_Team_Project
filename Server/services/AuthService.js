const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');

const AuthService = {
    registerUser: async (data) => {
        data.password = await bcrypt.hash(data.password, 10);

        try{
            await UserModel.create(data);
        }
        catch(err) { throw err } 
    }
}

module.exports = AuthService;