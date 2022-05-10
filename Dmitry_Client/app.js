const express = require('express');
const axios = require('axios').default;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:false }))

app.use('/public', express.static(__dirname + '/public'));

axios.defaults.baseURL = 'http://localhost:5000'

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


app.listen(3000, () => { console.log('Listening at */3000') });