const { Carro, CarroModelo } = require('../model/CarroSchema');
const { CarroMarcaModeloValidation } = require('../validation/carroValidation');


function _request(marca_id, modelo_id) {
    if (modelo_id) {
        return {
            method: "GET",
            url: 'http://localhost:3000/api/carro/modelo/' + modelo_id
        }
    } else if (marca_id) {
        return {
            method: "GET",
            url: "http://localhost:3000/api/carro/marca/" + marca_id

        }
    }
}

function _carroRequest(doc) {
    return {
        marca: doc.marca,
        modelos: doc.modelos.map(modelo => {
            return {
                nome: modelo.nome,
                _id: modelo._id,
                request: _request(doc._id, modelo._id)
            }
        }),
        _id: doc._id,
        request: _request(doc._id)
    };
}

function _mapListCarrosAsTable(doc) {
    return {
        message: `Sua pesquisa retornou ${doc.count ? doc.count : 0} resultados.`,
        count: doc.count ? doc.count : 0,
        skip: doc.skip ? doc.skip : 0,
        pagesize: doc.pagesize ? doc.pagesize : 0,
        carros: doc.carros ? doc.carros.map(carro => {
            return {
                marca: carro.marca,
                marca_id: carro._id,
                modelo: carro.modelo,
                modelo_id: carro.modelo_id,
                requests:
                {
                    marca: _request(carro._id),
                    modelo: _request(carro._id, carro.modelo_id)
                }
            }
        }) : []
    }

}

exports.listCarrosByMarcaModeloAsTable = async function (req, res, next) {
    //const busca = new RegExp(req.params.busca, "i");
    const search = new RegExp('\\b' + req.query.search ? req.query.search : '' + '\\b', 'i');
    const pageSize = req.query.size ? Number(req.query.size) : null;
    const pageStart = req.query.index ? Number(req.query.index) * pageSize : 0;
    const arrBusca = req.query.search ? req.query.search.split(" ") : "".split();
    const buscaMarca = arrBusca[0] ? new RegExp('\\b' + arrBusca[0] + '\\b', 'i') : 'null';
    const buscaModelo = arrBusca.shift() ? new RegExp('\\b' + arrBusca.join(" ") + '\\b', 'i') : 'null';
    try {
        //Identifica se o valor passado é a marca, o modelo e realiza a query de acordo
        var carros = await Carro
            .aggregate([
                //equivalente ao (JOIN) no SQL
                { $lookup: { from: "carromodelos", localField: "modelos", foreignField: "_id", as: "modelos" } },
                //traz o subarray modelos de carro para o array principal
                { $unwind: "$modelos" }, {
                    $project: { marca: "$marca", modelo: "$modelos.nome", modelo_id: "$modelos._id" }
                }, { //testa as igualdades
                    $match: {
                        $or: [
                            { marca: { $regex: search } },
                            { modelo: { $regex: search } },
                            { marca: { $regex: buscaMarca }, modelo: { $regex: buscaModelo } }
                        ]
                    }
                }, {
                    //order by
                    $sort: { marca: 1, modelo: 1 }
                }
                , { //Agrupa e counta total de registros
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        carros: { $push: '$$ROOT' } //e retorna em (carros) a os valores do agrupamento
                    }
                }, { //Desagrupa em "carros" e retorna resultado paginado
                    $project: {
                        _id: 0,
                        count: 1,
                        skip: { $literal: pageStart },
                        pagesize: function () { return pageSize ? { $literal: pageSize } : '$count' }, //subfuncao para contar ou nao
                        carros: { $slice: ['$carros', pageStart, pageSize ? pageSize : '$count'] } //Fatia o resultado
                    }
                }
            ]);
        res.send(_mapListCarrosAsTable(carros.length > 0 ? carros[0] : {}));
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err });
    }
}

exports.listModelos = async function (req, res, next) {
    try {
        const qryModelo = new RegExp(req.query.search ? req.query.search : '', "i");
        const modelos = await CarroModelo.find({ nome: { $regex: qryModelo } });
        res.send(modelos);
    } catch (err) { res.status(500).send({ error: err }) };
}

exports.listMarcas = async function (req, res, next) {
    try {
        const qryMarca = new RegExp(req.query.search, "i");
        const carros = await Carro.find({ marca: { $regex: qryMarca } })
            .select("marca _id");
        res.send(carros)
    } catch (err) { res.status(500).send({ error: err }) }
}

exports.getCarro = async function (req, res, next) {
    try {
        const carro = await Carro.findById(req.params._id)
            .populate('modelos');
        if (carro)
            res.send(_carroRequest(carro));
        else
            res.status(404).send({ message: "Invalid entry for provided ID" });
    } catch (err) { res.status(500).send({ error: err }) }
}

exports.getModelo = async function (req, res, next) {
    try {
        const carroModelo = await CarroModelo.findById(req.params._id)
            .select('nome');
        if (carroModelo)
            res.send(carroModelo);
        else
            res.status(404).send({ message: "Invalid entry for provided ID" });
    } catch (err) { res.status(500).send({ error: err }) }
}

exports.saveMarcaModeloSmart = async function (req, res, next) {
    try {
        submit = { marca: req.body.marca, modelo: req.body.modelo };
        //Insere modelo
        const { error } = CarroMarcaModeloValidation(submit);
        if (typeof error !== 'undefined')
            return res.status(400).send({ message: error.details[0].message });
        const modelo = new CarroModelo({ nome: submit.modelo });
        await modelo.save()
        //Verifica se carro já existe na base.
        const qryMarca = new RegExp(submit.marca, "i");
        if (await Carro.findOneAndUpdate({ marca: qryMarca },
            { $push: { modelos: modelo._id } })) {
            res.status(201).send({
                message: `Cadastro de modelo ${submit.modelo} cadastrado em ${submit.marca} previamente existente`
            });
        } else {
            //Não existe? grava insere marca na base de dados
            const carroInsert = new Carro({
                marca: submit.marca,
                $push: { modelos: modelo._id }
            });
            await carroInsert.save();
            res.status(201).send({
                message: `Marca ${submit.marca} e modelo ${submit.modelo} registrados com sucesso`,
                carro: _carroRequest(carroInsert)
            });
        }
    } catch (err) {
        if (err && err.name === 'ValidationError')
            res.status(400).send({ message: err.message })
        else
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
        const carroModelo = await CarroModelo.findOneAndUpdate({ _id: req.params._id },
            { $set: updateOps }
        );
        if (carroModelo)
            res.send({ message: "Modelo de carro atualizado com sucesso" })
        else
            res.status(404).send({ message: "No valid entry for provided ID" });
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
        //Remove da lista de carros em marca
        const carro = await Carro.findOneAndUpdate({ modelos: req.params._id },
            { $pull: { modelos: req.params._id } });
        //remove da lista de carros
        if (await CarroModelo.findOneAndDelete({ _id: req.params._id })) {
            res.send({
                message: 'Registro removido com sucesso.',
                _id: req.params._id
            });
        } else {
            res.status(404).send({ message: "No valid entry for provided ID" });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
}