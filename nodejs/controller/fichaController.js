Ficha = require('../model/Ficha');
const { fichaPostValidation,
    fichaPatchValidation,
    fichaServicoValidation,
    fichaIdValidation,
    fichaIdServicoValidation,
    fichaFinalizadoValidation,
    fichaRetornoValidation } = require('../validation/fichaValidation');
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
        const find = {
            "$and": [
                { _id: req.params._id },
                {
                    "servicos._id":
                        { "$exists": false }
                }
            ]
        };
        //Verifica se é tentativa de finalizar ficha sem serviços.
        if (await Ficha.findOne(find))
            return res.status(400).send({ "message": "Para finalizar a ficha, necessário executar ao menos um serviço." });
        const finalizado = { ...req.body, ...{ user: req.user._id } };
        const update = { finalizado: finalizado };
        return await _updateFicha(req.params._id, res, update)
    } catch (err) { console.error(err); res.status(500).send(err); }
}

exports.registrarRetorno = async (req, res) => {
    const { error } = fichaRetornoValidation(req.body);
    const { paramError } = fichaIdValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    if (typeof paramError !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        //Só é possível reabrir fichas já finalizadas
        const ficha = await Ficha.findById(req.params._id);
        if (!ficha)
            return res.status(404).send({ "message": "ficha não encontrada" });
        if (!ficha.finalizado)
            return res.status(400).send({ "message": "Impossível reabrir ficha não finalizada" });
        const reabertura = {
            finalizacaoAnterior: ficha.finalizado,
            data: req.body.data,
            user : req.user._id,
            justificativa: req.body.justificativa
        }
        ficha.reaberturas.push(reabertura);
        delete ficha.finalizado;
        await ficha.save();
        return res.status(201).send({"message":"ficha atualizada com ẽxito"})
    } catch (err) { console.error(err); res.status(500).send(err); }
}

exports.addServico = async (req, res) => {
    if (!validateServico(req)) return null;
    try {
        const body = req.body;
        Object.assign(body, { user: req.user._id });
        const update = { "$push": { "servicos": body } };
        const ficha = await Ficha.findOneAndUpdate({ "_id": req.params._id }, update);
        if (!ficha) return res.status(404).send({ "message": "Ficha não encontrada" });
        res.status(201).send(
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

exports.deleteServico = async (req, res) => {
    const { error } = fichaIdServicoValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        console.log(req.params);
        const find = {
            _id: req.params._id,
            servicos: { $elemMatch: { _id: req.params.servico_id } }
        }
        const update = {
            "$pull": { servicos: { _id: req.params.servico_id } }
        }
        //Verifica se a ficha foi finalizada. Caso afirmativo, impede de deletar o serviço.
        ficha = await Ficha.findOne(find);
        if (ficha && ficha.finalizado && ficha.finalizado.at) {
            return res.status(400).send({ "message": "Não é possível remover serviço de ficha finalizada" })
        }
        if (!await Ficha.findOneAndUpdate(find, update)) {
            return res.status(404).send({ "message": "Ficha ou serviço não encontrado" })
        }
        return res.send({ "message": "Serviço removido com êxito" })
    } catch (err) { res.status(500).send(err); console.error(err) }
}

exports.get = async (req, res) => {
    const { error } = fichaIdValidation(req.params);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        let filter = { _id: req.params._id };
        let options;
        if (req.params.servico_id) {
            filter = { ...filter, ...{ servicos: { $elemMatch: { _id: req.params.servico_id } } } }
            options = { 'servicos.$': 1 }
        }
        const ficha = await Ficha.findOne(filter, options)
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
        let find;
        //Se ativas =1 (true), exibe apenas fichas que não foram finalizadas.
        if (req.query.ativas == 0)
            find = {
                $or: [
                    { finalizado: null }
                ]
            };
        else if (req.query.ativas == 1)
            find = {
                $or: [
                    { finalizado: { $exists: true } }
                ]
            };
        else
            find = {};
        //where.$or.push({ finalizado: { $exists: false } });
        const fichas = await Ficha.find(find)
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
        const qtFichas = await Ficha.countDocuments(find);
        res.send(paginationRequest(fichas, qtFichas, getQuery, 'ficha'));
    } catch (err) { res.status(500).send(err); console.error(err) }
}