const Carro = require('../model/CarroSchema');

function _carroRequest(doc) {
    return {
        marca: doc.marca,
        modelos: doc.modelos.map(modelo => {
            return {
                nome: modelo.nome,
                _id: modelo._id,
                request: {
                    method: "GET",
                    url: `http://localhost:3000/api/carro/${doc._id}/${modelo._id}`
                }
            }
        }),
        _id: doc._id,
        request: {
            method: "GET",
            url: "http://localhost:3000/api/carro/" + doc._id
        }
    };
}

function _mapCarros(docs) {
    return docs.map(doc => {
        return _carroRequest(doc);
    })
}

function _mapListCarros(carros) {
    return {
        message: carros.length > 0 ?
            `A pesquisa retornou ${carros.length} resultados.` :
            `Não foram encontrados resultados para sua pesquisa`,
        count: carros.length,
        carros: carros.length > 0 ?
            _mapCarros(carros) :
            []
    }
}

exports.listByMarca = async function (req, res, next) {
    try {
        const marca = new RegExp(req.params.marca, "i");
        const carros = await Carro.find({ marca: { $regex: marca } })
            .select("marca _id");
        res.send(carros)
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.getCarroById = async function (req, res, next) {
    const id = req.params._id;
    try {
        const carro = await Carro.findById(id)
            .select("marca modelos _id");
        carro ?
            res.send(_carroRequest(carro)) :
            res.status(404).send({
                message: "No valid entry for provided ID"
            });

    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.getCarroMarcaModeloByIds = async function (req, res, next) {
    try {
        const carro = await Carro.findOne({
            _id: req.params.id_marca,
            "modelos._id": req.params.id_modelo
        }, { "modelos.$": 1 }).select("marca");
        carro ?
            res.send(carro) :
            res.status(404).send({ message: "No valid entry for provided ID" });
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.listAllCarros = async function (req, res, next) {
    try {
        const carros = await Carro.find().sort({ marca: 1 });
        res.send(_mapListCarros(carros));
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.listCarrosByMarcaModelo = async function (req, res, next) {
    //const busca = new RegExp(req.params.busca, "i");
    const busca = new RegExp('\\b' + req.query.busca + '\\b', 'i');
    const pageSize = req.query.size ? Number(req.query.size) : '$count';
    const pageStart = req.query.index ? Number(req.query.index) * pageSize : 0;
    const arrBusca = req.query.busca.split(" ");
    const buscaMarca = new RegExp('\\b' + arrBusca[0] ? arrBusca[0] : '' + '\\b', 'i');
    const buscaModelo = new RegExp('\\b' + arrBusca.shift() ? arrBusca.join(" ") : '' + '\\b', 'i');
    try {
        //Identifica se o valor passado é a marca, o modelo e realiza a query de acordo
        var carros = await Carro
            .aggregate([
                { $unwind: "$modelos" }, {
                    $project: {
                        marca: "$marca",
                        modelo: "$modelos.nome",
                        modelo_id: "$modelos._id"

                    }
                }, {
                    $match: {
                        $or: [
                            { marca: { $regex: busca } },
                            { modelo: { $regex: busca } },
                            { marca: { $regex: buscaMarca }, modelo: { $regex: buscaModelo } }
                        ]
                    }
                }, {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        results: { $push: '$$ROOT' }
                    }
                }, {
                    $project: {
                        _id: 0,
                        count: 1,
                        skip: { $literal: pageStart },
                        pagesize: { $literal: pageSize },
                        carros: { $slice: ['$results', pageStart, pageSize] }
                    }
                }
            ]);




        // .map(i =>
        //     i.modelos.map(
        //         m => ({ marca: i.marca, modelo: m.nome })
        //     )
        // ).flat();
        // if (!carros || carros.length === 0) {
        //     carros = await Carro
        //         .find({ modelos: { $elemMatch: { "nome": { $regex: busca } } } }, { "modelos.$": 1 })
        //         .select("marca _id modelos")
        //     if (!carros || carros.length === 0) {
        //         const arrBusca = req.params.busca.split(" ");
        //         const marca = new RegExp('\\b' + arrBusca[0] ? arrBusca[0] : '' + '\\b', 'i');
        //         arrBusca.shift(); //Remove primeiro elemento do array de busca
        //         const modelo = new RegExp('\\b' + arrBusca ? arrBusca.join(" ") : '' + '\\b', 'i');
        //         carros = await Carro.find({
        //             marca: marca,
        //             modelos: { $elemMatch: { "nome": modelo } }
        //         }, { "modelos.$": 1 }
        //         ).select("marca _id modelos");
        //     }
        // }
        //Só chega aqui se algum resultado foi retornado
        // res.send(_mapListCarros(carros));
        res.send({ carros: carros });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err });
    }
}

exports.saveCarro = async function (req, res, next) {
    try {
        const carro = new Carro({ marca: req.body.marca });
        await carro.save();
        res.status(201).send(_carroRequest(carro));
    } catch (err) {
        res.status(500).send({ error: err });
    }

}

exports.saveModelo = async function (req, res, next) {
    try {
        const carro = await Carro.findById(req.params._id);
        //Realiza validações antes de gravar
        if (!carro) {
            res.status(404).send({
                message: "No valid entry for provided ID"
            });
        } else
            if (carro.modelos && carro.modelos.find(modelo => modelo.nome == req.body.nome)) {
                res.status(400).send({
                    message: "Modelo já cadastrado para o carro",
                    carro: _carroRequest(carro)
                });
            } else {
                carro.modelos.push({ nome: req.body.nome });
                await carro.save();
                res.status(201).send({
                    message: "Cadastro realizado com suceso",
                    carro: _carroRequest(carro)
                });
            }
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.saveMarcaModeloSmart = async function (req, res, next) {
    try {
        //Verifica se Marca já cadastrada. Caso sim, cadastra modelo
        const marca = new RegExp(req.body.marca, "i");
        const carroUpdate = await Carro.findOne({ marca: { $regex: marca } });
        //Existe marca? verifica se modelo já foi cadastrado.
        if (carroUpdate) {

            const modelos = carroUpdate.modelos.filter(function (item) {
                return item.nome == req.body.modelo;
            });
            //Se modelo já existir, sai fora retornando erro de requisição
            if (modelos && modelos.length > 0) {
                res.status(400).send({
                    message: `Marca ${req.body.marca} e modelo ${req.body.modelo} já regristrados`
                });
            } else {
                carroUpdate.modelos.push({ nome: req.body.modelo });
                await carroUpdate.save();
                res.status(201).send({
                    message: "Cadastro de modelo realizado em marca previamente existente",
                    carro: _carroRequest(carroUpdate)
                });
            }
        } else {
            //Gravação de novo carro e novo modelo
            const carroInsert = new Carro({ marca: req.body.marca });
            carroInsert.modelos.push({ nome: req.body.modelo });
            await carroInsert.save();
            res.status(201).send({
                message: "Cadastro de nova marca e modelo realizados com sucesso",
                carro: _carroRequest(carroInsert)
            });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.updateCarro = async function (req, res, next) {
    try {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const carro = await Carro.findOneAndUpdate(
            { _id: req.params._id }, { $set: updateOps }
        );
        if (carro) {
            res.send({
                message: "Carro atualizado com sucesso"
            });
        } else {
            res.status(404).send({ message: "No valid entry for provided ID" });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.updateModelo = async function (req, res, next) {
    try {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }

        const carro = await Carro.findOneAndUpdate({
            _id: req.params.id_marca,
            "modelos._id": req.params.id_modelo
        },
            { $set: { "modelos.$": updateOps } }
        );
        carro ?
            res.send({
                message: "Modelo de carro atualizado com sucesso"
            }) :
            res.status(404).send({
                message: "No valid entry for provided ID"
            });
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.deleteCarro = async function (req, res, next) {
    try {
        if (await Carro.findOneAndDelete({ _id: req.params._id })) {
            res.send({
                message: `Registro removido com sucesso`,
                _id: req.params._id
            })
        } else {
            res.status(404).send({ message: "No valid entry for provided ID" });
        }

    } catch (err) {
        res.status(500).send({ error: err });
    }
}

exports.deleteModelo = async function (req, res, next) {
    try {
        const carro = await Carro.findOne({
            _id: req.params.id_marca,
            "modelos._id": req.params.id_modelo
        });
        if (carro) {
            await carro.modelos
                .pull({ _id: req.params.id_modelo });
            await carro.save();
            res.status(200).send({ message: "Marca removida com sucesso" });
        } else {
            res.status(404).send({ message: "No valid entry found for provided ID" });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
}