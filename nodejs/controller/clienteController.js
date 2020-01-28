const { Cliente } = require('../model/Cliente');
const { ClienteVeiculo } = require('../model/ClienteVeiculo');
const { ClienteValidation } = require('../validation/clienteValidation');
const defineRequest = require('../util/defineRequest');

const _insertArrayVeiculos = async (arrVeiculos) => {
    const veiculos = arrVeiculos.map(v => _insertClienteVeiculo(v));
    return veiculos;
}

const _insertClienteVeiculo = (veiculo) => {
    const clienteVeiculo = new ClienteVeiculo({
        carro: {
            _id: veiculo.carro._id
        },
        carroModelo: {
            _id: veiculo.carroModelo._id
        },
        placa: veiculo.placa,
        chassi: veiculo.chassi
    });
    clienteVeiculo.save();
    return clienteVeiculo._id;
}

exports.getCliente = async (req, res) => {
    try {
        const id = req.params._id;
        const cliente = await Cliente.findById(id)
            .populate({
                path: 'veiculos',
                populate: [
                    { path: 'carro', select: 'marca' },
                    { path: 'carroModelo', select: 'nome' }
                ]
            });
        if (!cliente) {
            return res.status(400).send({ 'message': 'No valid entry for provided ID' })
        }
        res.send(Object.assign(
            { request: defineRequest('GET', 'cliente', cliente._id) },
            cliente._doc
        ));

    } catch (err) { res.status(500).send({ error: err }); }
}

exports.saveCliente = async (req, res) => {
    const { error } = ClienteValidation(req.body);
    //Valida requisição.
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    const cliente = new Cliente(req.body);
    try {
        cliente.veiculos = await _insertArrayVeiculos(req.body.veiculos);
        await cliente.save();
        res.status(201).send({
            "message": "Novo cliente armazenado com êxito.",
            "_id": cliente._id,
            "request": defineRequest('GET', 'cliente', cliente._id)
        });
    } catch (err) {
        res.status(500).send(err);
    };
};

exports.putCliente = async (req, res) => {
    const { error } = ClienteValidation(req.body);
    //valida requisição
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    try {
        let update = req.body;
        cliente = await Cliente.findById(req.params._id);
        if (!cliente) {
            return res.status(400).send({ 'message': 'No valid entry for provided ID' })
        }
        //Trata os veiculos, incluindo os novos, excluindo os velhos e atualizando os atuais.
        const veiculosExcluir = cliente.veiculos.filter(v =>
            !req.body.veiculos.some(v2 => (v2._id == v))
        );
        const veiculosIncluir = req.body.veiculos.filter(v2 =>
            !cliente.veiculos.some(v => (v == v2._id))
        );
        //Inclui novos veículos
        const idVeiculosIncluir = await veiculosIncluir.map(v => {
            const clienteVeiculo = new ClienteVeiculo(v);
            clienteVeiculo.save();
            return clienteVeiculo._id;
        });
        //Monta o update, Substituindo veiculos, 
        //removendo os objetos a excluir e incluindo os novos objetos
        update.veiculos = cliente.veiculos.filter(v =>
            req.body.veiculos.some(v2 => (v2._id == v))
        ).concat(idVeiculosIncluir);
        await Cliente.updateOne({ _id: req.params._id }, update);
        //realiza exclusão lógica dos ClienteVeiculo excluidos.
        await ClienteVeiculo.updateMany({ _id: { $in: veiculosExcluir } },
            { deleted: { cliente: cliente._id, date: Date.now() } }
        );
        res.send({ message: 'Registro atualizado com sucesso' });
    } catch (err) { res.status(500).send({ error: err }); }
}

exports.listCliente = async (req, res) => {
    try {
        const search = new RegExp('\\b' + req.query.search ? req.query.search : '' + '\\b', 'i');
        const pageSize = req.query.size ? Number(req.query.size) : null;
        const skip = req.query.index ? Number(req.query.index) * pageSize : 0;
        const clientes = await Cliente.find({ nome: { $regex: search } })
            .skip(skip)
            .limit(pageSize)
            .populate({
                path: 'veiculos',
                populate: [
                    { path: 'carro', select: 'marca' },
                    { path: 'carroModelo', select: 'nome' }
                ]
            })
            .sort({ 'nome': 1 });
        const qtClientes = await Cliente.countDocuments({ nome: { $regex: search } });
        res.send({
            message: 'Sua busca retornou ' + qtClientes + ' resultados.',
            count: qtClientes,
            skip: skip,
            pageSize: pageSize ? pageSize : qtClientes,
            clientes: clientes
                .map(c => Object.assign({ request: defineRequest('GET', 'cliente', c._id) }, c._doc))
        });
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndDelete({ _id: req.params._id });
        if (cliente)
            res.status(200).send({ message: "Registro removido com sucesso" })
        else
            res.status(400).send({ message: 'No valid entry for provided ID' })
    } catch (err) { res.status(500).send({ error: err }) }
}