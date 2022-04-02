const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const ChatDB = require('./config/keys').MongoChatDBURI;
    mongoose.connect(ChatDB)
        .then(() => console.log('Connected to chat db'))
        .catch((err) => console.log(err));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));
app.use('/profile', require('./routes/profile'));

app.listen(5000, () => { console.log('Listening at */5000') });