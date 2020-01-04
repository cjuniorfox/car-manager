const { Cliente, ClienteVeiculo } = require('../model/clienteSchema');
const { ClienteValidation } = require('../validation/clienteValidation');
const defineRequest = require('../util/defineRequest');

const _insertArrayVeiculos = async (arrVeiculos) => {
    const veiculos = arrVeiculos.map(v => {
        const clienteVeiculo = new ClienteVeiculo({
            carro: {
                _id: v.carro._id
            },
            carroModelo: {
                _id: v.carroModelo._id
            },
            placa: v.placa,
            chassi: v.chassi
        });
        clienteVeiculo.save();
        return clienteVeiculo._id;
    });
    return veiculos;
}

exports.saveCliente = async (req, res) => {
    const submit = {
        nome: req.body.nome,
        documento: {
            documento: req.body.documento.documento,
            tipoDocumento: req.body.documento.tipoDocumento
        },
        endereco: {
            endereco: req.body.endereco.endereco,
            cidade: req.body.endereco.cidade,
            cep: req.body.endereco.cep
        },
        telefones: req.body.telefones,
        veiculos: req.body.veiculos
    };
    const { error } = ClienteValidation(submit);
    if (typeof error !== 'undefined')
        return res.status(400).send({ message: error.details[0].message });
    const cliente = new Cliente(submit);
    cliente.veiculos = await _insertArrayVeiculos(submit.veiculos);
    try {
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
        res.send(Object.assign(
            { request: defineRequest('GET', 'cliente', cliente._id) },
            cliente._doc
        ));

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
        const qtClientes = await Cliente.count({ nome: { $regex: search } });
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
            res.send({ message: "Registro removido com sucesso" })
        else
            res.status(400).send({ message: 'No valid entry for provided ID' })
    } catch (err) { res.status(500).send({ error: err }) }
}