Veiculo = require('../model/Veiculo');

const VeiculoController = {
    async show(req,res){
        try{
            const veiculo = await Veiculo
                .findById(req.param.id)
                .populate('veiculo')
                .populate('carro');
            res.send(veiculo);
        }catch(err){
            res.status(400).send(err);
        };
    },
    async post(req,res){
        const veiculo = new Veiculo({
            carro: req.body.carro._id,
            placa: req.body.placa,
            chassi: req.body.chassi
        });
        try{
            const savedVeiculo = await veiculo.save();
            await savedVeiculo.populate('carro').execPopulate();
            res.send(savedVeiculo);
        }catch(err){
            res.status(400).send(err);
        };
    }
}

module.exports = VeiculoController;