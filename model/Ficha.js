const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
    retorno: {
        type: Boolean,
        required: true,
        default: false
    },
    setor: {
        type: String,
        Enumerator : ['OF', 'VN', 'SL', 'TD', 'VU'] 
    },
    dataRecepcao: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataPrevisaoSaida: Date,
    osSistema: {
        type: Number,
        required: true
    },
    osInterna: Number,
    veiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    avariaInterior:{
        existente:{
            type: Boolean,
            required: true
        },
        detalhe: String
    },
    pertencesNoVeiculo: {
        existente: {
            type: Boolean,
            required: true
        },
        detalhe: String
    },
    tipoServico: {
        tipo: {
            type:String,
            Enumerator: ['Cortesia', 'Ducha', 'Lavagem simples', 'Lavagem completa', 'Servicos']
        },
        descServicos: String
    }

});

module.exports = mongoose.model('Ficha',fichaSchema);