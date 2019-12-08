const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome : {
        required: true,
        type: String,
        min: 5
    },
    telefone: [
        {
        type: String,
            min: 8,
            max: 13
        }
    ],
    documento:{
        required: true,
        type: String
    },
    veiculos:[
        {
            carro: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Veiculo'
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
        }
    ]
});

module.exports = mongoose.model('Cliente',clienteSchema);