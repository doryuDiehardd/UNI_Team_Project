const express = require('express');

const app = express();

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));
app.use('/profile', require('./routes/profile'));

app.listen(5000, () => { console.log('Listening at */5000') });