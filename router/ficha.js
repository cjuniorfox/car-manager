const router = require('express').Router();
const Ficha = require('../model/fichaSchema');

router.post('/entrada', async (req, res) => {
    const ficha = new Ficha({
        retorno: false,
        setor: req.body.setor,
        osSistema: req.body.osSistema,
        veiculo: req.body.veiculo,
        placa: req.body.placa,
        chassi: req.body.chassi,
        avariaInterior: {
            existente: req.body.avariaInterior.existente,
            detalhe: req.body.avariaInterior.detalhe
        },
        pertentesNoVeiculo: {
            existente: req.body.pertentesNoVeiculo.existente,
            detalhe: req.body.pertentesNoVeiculo.detalhe
        },
        tipoServico: {
            tipo: req.body.tipoServico.tipo,
            detalhe: req.body.tipoServico.detalhe
        }
    });
    try{
        const savedFicha = ficha.save();
        res.send(savedFicha._id);
    }catch(err){
        res.status(400).send(err);
    };
});

module.exports = router;