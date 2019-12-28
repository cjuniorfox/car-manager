const router = require('express').Router();
const Carro = require('../model/CarroSchema');

function _carroRequest(doc) {
    return {
        marca: doc.marca,
        modelo: doc.modelo,
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

function _queryCarros(search) {
    const arrSearch = search.split(" ");
    //para busca ignorando case
    search = new RegExp('\\b' + search + '\\b', 'i');
    //Busca por marca ou modelo ou marca e modelo
    return {
        $or: [
            { marca: search },
            { modelo: search },
            {
                marca: arrSearch.length > 0 ? new RegExp('\\b' + arrSearch[0] + '\\b', 'i') : search,
                modelo: arrSearch.length > 1 ? new RegExp('\\b' + arrSearch[1] + '\\b', 'i') : search
            }
        ]
    };
}

/**
 * Listar todos os carros
 */
router.get("/", async (req, res, next) => {
    await Carro.find()
        .select("marca modelo _id")
        .then(docs => {
            const response = {
                count: docs.length,
                carros: _mapCarros(docs)
            };
            res.status(200).json(response);
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * Busca de carros
 */

router.post("/buscar", async (req, res, next) => {
    let busca = {};
    if (req.body && req.body.search) {
        busca = _queryCarros(req.body.search)
    }
    await Carro.find(busca)
        .sort({ marca: 1 })
        .select("marca modelo _id")
        .then(docs => {
            const response = {
                count: docs.length,
                carros: _mapCarros(docs)
            };
            res.status(200).json(response);
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        });
})

/**
 * Obter carro
 */

router.get("/:_id", async (req, res, next) => {
    const id = req.params._id;
    Carro.findById(id)
        .select("marca modelo _id")
        .then(doc => {
            res.status(200).json(_carroRequest(doc));
        }).catch(err => {
            if (err.name === "CastError") {
                res.status(404).json({
                    message: "No valid entry for provided ID"
                });
            } else {
                res.status(500).json({ error: err });
            }
        });
});

router.post("/", async (req, res) => {
    const params = {
        marca: req.body.marca,
        modelo: req.body.modelo
    }
    const carro = new Carro(params);
    try {
        carros = await Carro.find(params);
        //Se carro cadastrado, sai fora retornando erro
        if (carros.length > 0) {
            const error = {
                message: "Carro já cadastrado",
                carros: _mapCarros(carros)
            };
            res.status(400).send(error);
            throw new Error(error);
        }
        //Tudo ok? Grava carro
        await carro.save()
            .then(result => {
                res.status(201).send({
                    message: "Criado com sucesso",
                    carro: _carroRequest(result)
                });
            })
            .catch(err => {
                res.status(400).send({ message: err });
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * Alterar carro existente
 */
router.patch("/:_id", async (req, res, next) => {
    const id = req.params._id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Carro.update({ _id: id }, { $set: updateOps })
        .then(result => {
            res.status(200).json({
                message: "Carro atualizado",
                request: "http://localhost:3000/api/carro" + id
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;