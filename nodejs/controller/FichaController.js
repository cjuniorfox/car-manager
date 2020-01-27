Ficha = require('../model/fichaSchema');
const { FichaEntradaValidation } = require('../validation/fichaValidation');
const { searchFichaValidation } = require('../validation/searchValidation');
const defineRequest = require('../util/defineRequest');
const defineQuery = require('../util/defineQuery');
const paginationRequest = require('../util/paginationRequest');

const defineFichaCreated = (req) => {
    return {
        user: req.user._id,
        from: req.connection.remoteAddress,
        at: Date.now()
    }
}

exports.saveFichaEntrada = async (req, res) => {
    const { error } = FichaEntradaValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        let ficha = new Ficha(req.body);
        ficha.created = defineFichaCreated(req);
        await ficha.save();
        return res.status(201).send({
            message: "Entrada de ficha registrada com sucesso",
            request: defineRequest('GET', 'cliente', ficha._id)
        })
    } catch (err) { res.status(500).send(err); }
}

exports.addServico = async (req, res) => {

}

exports.fichas = async (req, res) => {
    const { error } = searchFichaValidation(req.query);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    const getQuery = defineQuery(req.query);
    try {
        let where = {
            $or: [
                { "finalizado.at": null },
                { finalizado: null }
            ]
        };
        //Se ativas =1 (true), exibe apenas fichas que não foram finalizadas.
        if (req.query.ativas == 1)
            where.$or.push({ finalizado: { $exists: false } });

        const fichas = await Ficha.find(where)
            .skip(getQuery.skip)
            .limit(getQuery.pageSize)
            .populate({ path: 'created.user', select: 'name username admin' })
            .populate({ path: 'dadosCadastrais.cliente', select: 'nome documento endereco telefones' })
            .populate({
                path: 'dadosCadastrais.clienteVeiculo',
                populate: [
                    { path: 'carro', select: 'marca' },
                    'carroModelo'
                ]
            });
        const qtFichas = await Ficha.countDocuments(where);
        res.send(paginationRequest(fichas, qtFichas, getQuery, 'ficha'));
    } catch (err) { res.status(500).send(err); console.error(err) }
}