const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const FichaRoute = require('./routes/FichaRoute');
const CarroRoute = require('./routes/CarroRoute');
const ClienteRoute = require('./routes/ClienteRoute');
const VeiculoRoute = require('./routes/veiculoRoute');

const app = express();

//Database
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useFindAndModify: false 
    },
    () => console.log('Connected to DB!')
);
mongoose.set('useCreateIndex', true)

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/ficha/', FichaRoute);
app.use('/api/carro/', CarroRoute);
app.use('/api/cliente', ClienteRoute);
app.use('/api/veiculo', VeiculoRoute);


app.listen(3000, () => console.log('Car management up and running!'));