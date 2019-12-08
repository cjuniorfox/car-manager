Ficha = require('../model/Ficha');
Veiculo = require('../model/Veiculo');

const FichaController = {
    async show(req, res) {
        try{
            const ficha = await Ficha
            .findById(req.params.id)
            .populate('ficha');
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
            veiculo: req.body.veiculo._id,
            placa: req.body.placa,
            chassi: req.body.chassi,
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
            await savedFicha.populate("veiculo").execPopulate();
            res.send(savedFicha);
        }catch(err){
            res.status(400).send(err);
        };
    }
};

module.exports = FichaController;
