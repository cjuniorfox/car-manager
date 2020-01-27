const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const carroModeloSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    }
    
});
carroModeloSchema.plugin(uniqueValidator,{ message: '{PATH} já registrado anteriormente.' });
const carroModelo = mongoose.model('carromodelos', carroModeloSchema);

const carroSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true,
        min: 3,
        unique: true,
        uniqueCaseInsensitive: true
    },
    modelos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carromodelos'
    }]

});
carroSchema.plugin(uniqueValidator,{ message: '{PATH} já registrado anteriormente.' });
const carro = module.exports = mongoose.model('carros', carroSchema);

module.exports = {
    CarroModelo : carroModelo,
    Carro : carro
}