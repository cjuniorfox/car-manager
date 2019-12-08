const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const FichaRoute = require('./routes/FichaRoute');
const VeiculoRoute = require('./routes/VeiculoRoute');
const ClienteRoute = require('./routes/ClienteRoute');

const app = express();

//Database
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser : true},
    () => console.log('Connected to DB!')
);

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/api/ficha/',FichaRoute);
app.use('/api/veiculo/',VeiculoRoute);
app.use('/api/cliente',ClienteRoute);


app.listen(3000, () => console.log('Car management up and running!'));