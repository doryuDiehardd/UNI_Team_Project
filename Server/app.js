const express = require('express');
const mongoose = require('mongoose');

const app = express();

const ChatDB = require('./config/keys').MongoChatDBURI;
    mongoose.connect(ChatDB)
        .then(() => console.log('Connected to chat db'))
        .catch((err) => console.log(err));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));
app.use('/profile', require('./routes/profile'));

app.listen(5000, () => { console.log('Listening at */5000') });