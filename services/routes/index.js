const express = require('express');
const app = express();

//app.use('/UserDepto', require('./userdepto'));
app.use('/Auth', require('./auth'));
app.use('/Cliente', require('./cliente'));

module.exports = app;