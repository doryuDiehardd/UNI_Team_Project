const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:false }))

app.use('/public', express.static(__dirname + '/public'));


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


app.listen(3000, () => { console.log('Listening at */3000') });