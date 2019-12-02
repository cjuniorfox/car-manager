const mongoose = require('mongoose');

const veiculoSchema = new mongoose.Schema({
    marca : {
        type : String,
        required : true
    },
    modelo : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Veiculo',veiculoSchema);