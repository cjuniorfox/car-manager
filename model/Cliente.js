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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veiculo'
        }
    ]
});

module.exports = mongoose.model('Cliente',clienteSchema);