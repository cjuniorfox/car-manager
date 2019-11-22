const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const fichaRoute = require('./router/ficha');

const app = express();

//Database
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser : true},
    () => console.log('Connected to DB!')
);

//Middleware

//Routes
app.use('/api/ficha/',fichaRoute);

app.listen(3000, () => console.log('Car management up and running!'));