Ficha = require('../model/fichaSchema');
const { FichaEntradaValidation } = require('../validation/fichaValidation');
const defineRequest = require('../util/defineRequest');


exports.saveFichaEntrada = async (req, res) => {
    const { error } = FichaEntradaValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        const ficha = new Ficha(req.body);
        await ficha.save();
        return res.send({
            message: "Entrada de ficha registrada com sucesso",
            request: defineRequest('GET', 'cliente', ficha._id)
        })
    } catch (err) { res.status(500).send(err); }
}