const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (user_name, password, done) => {
            // Mathch user
            UserModel.findOne({ user_name: user_name })
                .then(user => {
                    if (!user){
                        return done(null, false, {message: 'No user with givent username is registered' });
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch){
                            return done(null, user);
                        }
                        else{
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            done(err, user);
        });
    });
}