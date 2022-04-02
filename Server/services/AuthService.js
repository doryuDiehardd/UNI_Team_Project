const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');

const UserExistsException = require('./exceptions/UserExistsException');

const AuthService = {
    registerUser: async (data) => {
        const is_registered = await UserModel.findOne({ email: data.email });

        if (is_registered){
            throw new UserExistsException('User with given email already exists');
        }

        data.password = await bcrypt.hash(data.password, 10);

        try{
            await UserModel.create(data);
        }
        catch(err) { throw err } 
    }
}

module.exports = AuthService;