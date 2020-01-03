Ficha = require('../model/FichaSchema');
Veiculo = require('../model/carroSchema');

const FichaController = {
    async show(req, res) {
        try{
            const ficha = await Ficha
            .findById(req.params.id)
            .populate('ficha')
            .populate('cliente')
            .populate('cliente.veiculo')
            .populate('cliente.veiculo.carro');
            res.send(ficha);
        }catch(err){
            res.status(400).send(err);
        }
        
    },
    async entrada(req, res) {        
        const ficha = new Ficha({
            retorno: false,
            setor: req.body.setor,
            dataPrevistaSaida: req.body.dataPrevistaSaida,
            osSistema: req.body.osSistema,
            cliente: req.body.cliente._id,
            veiculo: req.body.veiculo._id,
            avariaInterior: {
                existente: req.body.avariaInterior.existente,
                detalhe: req.body.avariaInterior.detalhe
            },
            pertencesNoVeiculo: {
                existente: req.body.pertencesNoVeiculo.existente,
                detalhe: req.body.pertencesNoVeiculo.detalhe
            },
            tipoServico: {
                tipo: req.body.tipoServico.tipo,
                detalhe: req.body.tipoServico.detalhe
            }
        });
        try{
            const savedFicha = await ficha.save();
            await savedFicha
                .populate('cliente')
                .populate('veiculo')
                .execPopulate();
            await savedFicha
                .populate('veiculo.carro')
                .execPopulate();
            res.send(savedFicha);
        }catch(err){
            res.status(400).send(err);
        };
    }
};

module.exports = FichaController;
