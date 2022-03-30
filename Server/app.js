const express = require('express');

const app = express();

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));
app.use('/profile', require('./routes/profile'));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
})

app.listen(5000, () => { console.log('Listening at */5000') });