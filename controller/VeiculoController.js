Veiculo = require('../model/veiculoSchema');

const VeiculoController = {
    async index(req,res){
        const veiculos = await Veiculo
            .find()
            .populate('veiculos');
        res.send(veiculos); 
    },
    async show(req, res){
        const veiculo = await Veiculo
            .findById(req.params.id)
            .populate('veiculos');
        res.send(veiculo);
    },
    async insert(req,res){
        const veiculo = new Veiculo( {
            marca : req.body.marca,
            modelo: req.body.modelo
        });
        const savedVeiculo = await veiculo.save();
        res.send(veiculo);
    }
};

module.exports = VeiculoController;