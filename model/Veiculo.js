const mongoose = require('mongoose');

const veiculoSchema = new mongoose.Schema({
    carro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carro'
    },
    placa: {
        type: String,
        min: 7,
        max: 7
    },
    chassi: {
        type: String,
        min: 10,
        max: 10
    }   
});

module.exports = mongoose.model('Veiculo', veiculoSchema);