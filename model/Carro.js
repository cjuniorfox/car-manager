const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
    marca : {
        type : String,
        required : true
    },
    modelo : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Carro',carroSchema);