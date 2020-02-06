Ficha = require('../model/Ficha');
const { fichaPostValidation,
    fichaPatchValidation,
    fichaServicoValidation,
    fichaIdValidation,
    fichaIdServicoValidation,
    fichaFinalizadoValidation } = require('../validation/fichaValidation');
const { searchFichaValidation } = require('../validation/searchValidation');
const defineRequest = require('../util/defineRequest');
const defineQuery = require('../util/defineQuery');
const paginationRequest = require('../util/paginationRequest');
const updateOps = require('../util/updateOps');
const mongoose = require('mongoose');

const defineFichaCreated = (req) => {
    return {
        user: req.user._id,
        from: req.connection.remoteAddress,
        at: Date.now()
    }
}

const validateServico = (req, validateIdServico) => {
    const { error } = fichaServicoValidation(req.body);
    const { paramError } = validateIdServico ?
        fichaIdServicoValidation(req.body) : fichaIdValidation(req.params);

    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    if (typeof paramError !== 'undefined')
        return res.status(400).send({ message: paramError.details[0].message });
    return true;
}

const _updateFicha = async (_id, res, body) => {
    const ficha = await Ficha.findOneAndUpdate({ _id: _id }, { "$set": body });
    if (!ficha) return res.status(404).send({ "message": "Ficha não encontrada" });
    res.send(
        {
            "message": "Ficha atualizada com sucesso.",
            "request": defineRequest('GET', 'ficha', ficha._id)
        });
}

exports.post = async (req, res) => {
    const { error } = fichaPostValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });

    try {
        let ficha = new Ficha(req.body);
        ficha.created = defineFichaCreated(req);
        await ficha.save();
        return res.status(201).send({
            message: "Entrada de ficha registrada com sucesso",
            request: defineRequest('GET', 'ficha', ficha._id)
        })
    } catch (err) { res.status(500).send(err); }
}

exports.put = async (req, res) => {
    const { error } = fichaPostValidation(req.body);
    const { paramError } = fichaIdValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    if (typeof paramError !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        const ficha = await Ficha.findOneAndUpdate({ _id: req.params._id }, req.body);
        if (!ficha) return res.status(404).send({ "message": "Ficha não encontrada" });
        res.send(
            {
                "message": "Ficha atualizada com sucesso.",
                "request": defineRequest('GET', 'ficha', ficha._id)
            });
    } catch (err) { console.error(err); res.status(500).send(err); }
}

exports.patch = async (req, res) => {
    const update = updateOps(req.body);
    const { error } = fichaPatchValidation(update);
    const { paramError } = fichaIdValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    if (typeof paramError !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        return await _updateFicha(req.params._id, res, update);
    } catch (err) { res.status(500).send(err); }
}

exports.finalizar = async (req, res) => {
    const { error } = fichaFinalizadoValidation(req.body);

    const { paramError } = fichaIdValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    if (typeof paramError !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        const finalizado = { ...req.body, ...{ user: req.user._id } };
        const update = { finalizado: finalizado };
        return await _updateFicha(req.params._id, res, update)
    } catch (err) { res.status(500).send(err); }
}

exports.addServico = async (req, res) => {
    if (!validateServico(req)) return null;
    try {
        const body = req.body;
        Object.assign(body, { user: req.user._id });
        const update = { "$push": { "servicos": body } };
        const ficha = await Ficha.findOneAndUpdate({ "_id": req.params._id }, update);
        if (!ficha) return res.status(404).send({ "message": "Ficha não encontrada" });
        res.send(
            {
                "message": "Servico adicionado a ficha com sucesso.",
                "request": defineRequest('GET', 'ficha', ficha._id)
            });
    } catch (err) { res.status(500).send(err); }
}

exports.putServico = async (req, res) => {
    if (!validateServico(req, true)) return null;
    try {
        const body = req.body;
        Object.assign(body, { user: req.user._id });
        const where = { "_id": req.params._id, "servicos._id": req.params.servico_id }
        const update = { "$set": { "servicos.$": body } };
        const ficha = await Ficha.findOneAndUpdate(where, update);
        if (!ficha) return res.status(404).send({ "message": "Ficha ou serviço não encontrado." });
        res.send(
            {
                "message": "Servico atualizado com êxito.",
                "request": defineRequest('GET', 'ficha', ficha._id)
            });
    } catch (err) { res.status(500).send(err); }
}

exports.get = async (req, res) => {
    const { error } = fichaIdValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        let filter = { _id: req.params._id };
        let options;
        if (req.params.servico_id){
            filter = { ...filter, ...{ servicos: { $elemMatch: { _id: req.params.servico_id } } } }
            options = { 'servicos.$': 1 }
        }
        const ficha = await Ficha.findOne(filter)
            .populate({
                'path': 'dadosCadastrais.cliente',
                'populate': {
                    'path': 'veiculos',
                    'populate': [
                        { 'path': 'carro', 'select': 'marca' },
                        { 'path': 'carroModelo', 'select': 'nome' }
                    ]
                }
            })
            .populate('dadosCadastrais.clienteVeiculo')
            .populate('created.user');
        /* const fichaAg = await Ficha.aggregate([{
            "$match":
                { _id: mongoose.Types.ObjectId(req.params._id) },
        }, {
            "$project": {
                "servicos": {
                    "$filter": {
                        "input": "$servicos",
                        "as": "servicos",
                        "cond": {
                            "$eq": ["$$servicos._id", mongoose.Types.ObjectId(req.params.servico_id)]
                        }
                    }
                }
            }
        }]);
         */
        if (!ficha)
            return res.status(404).send({ "message": "Ficha não encontrada" });
        return res.send(Object.assign(
            { request: defineRequest('GET', 'ficha', ficha._id) },
            ficha._doc)
        );
    } catch (err) { res.status(500).send(err); console.error(err) }
}

exports.fichas = async (req, res) => {
    const { error } = searchFichaValidation(req.query);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    const getQuery = defineQuery(req.query);
    try {
        let where;
        //Se ativas =1 (true), exibe apenas fichas que não foram finalizadas.
        if (req.query.ativas == 0)
            where = {
                $or: [
                    { finalizado: null }
                ]
            };
        else if (req.query.ativas == 1)
            where = {
                $or: [
                    { finalizado: { $exists: true } }
                ]
            };
        else
            where = {};
        //where.$or.push({ finalizado: { $exists: false } });
        const fichas = await Ficha.find(where)
            .skip(getQuery.skip)
            .limit(getQuery.pageSize)
            .populate({ path: 'created.user', select: 'name username admin' })
            .populate('finalizado.user')
            .populate({ path: 'servicos.user', select: 'name username' })
            .populate({ path: 'dadosCadastrais.cliente', select: 'nome documento endereco telefones' })
            .populate({
                path: 'dadosCadastrais.clienteVeiculo',
                populate: [
                    { path: 'carro', select: 'marca' },
                    'carroModelo'
                ]
            });
        fichas.map(ficha => {
            ficha.servicos.sort((m1, m2) => m1.inicio - m2.inicio)
            return ficha;
        })
        const qtFichas = await Ficha.countDocuments(where);
        res.send(paginationRequest(fichas, qtFichas, getQuery, 'ficha'));
    } catch (err) { res.status(500).send(err); console.error(err) }
}