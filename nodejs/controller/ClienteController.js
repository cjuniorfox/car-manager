const { Cliente, ClienteVeiculo } = require('../model/clienteSchema');
const { ClienteValidation } = require('../validation/clienteValidation');

async function _insertArrayVeiculos(arrVeiculos) {
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

exports.saveCliente = async function (req, res) {
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
            "request": {
                "method": "GET",
                "url": "http://localhost:3000/api/cliente/" + cliente._id
            }
        });
    } catch (err) {
        res.status(500).send(err);
    };
};