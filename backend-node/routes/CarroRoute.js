const router = require('express').Router();
//const CarroController = require('../controller/CarroController');

//router.get('/',CarroController.index);
//router.get('/:id',CarroController.show);
//router.post('/',CarroController.insert);

const Carro = require('../model/Carro');

function mapCarros(docs) {
    return docs.map(doc => {
        return {
            marca: doc.marca,
            modelo: doc.modelo,
            _id: doc._id,
            request: {
                type: "GET",
                url: "http://localhost:3000/api/carro/" + doc._id
            }
        };
    })
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
                carros: mapCarros(docs)
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
 * Lista carros por marca ou modelo
 */

router.post("/marca-modelo/", async (req, res, next) => {
    const search = req.body.search;
    const arrSearch = search.split(" ");
    await Carro.find({
        $or: [
            { marca: search },
            { modelo: search },
            {
                marca: arrSearch.length > 0 ? arrSearch[0] : search,
                modelo: arrSearch.length > 1 ? arrSearch[1] : search
            }
        ]
    })
        .select("marca modelo _id")
        .then(docs => {
            const response = {
                count: docs.length,
                carros: mapCarros(docs)
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
            res.status(200).json({
                carro: doc,
                request: {
                    type: "GET",
                    url: "http://localhost:8000/api/carro/"
                }
            });
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

/**
 * Inserir novo carro
 */
router.post("/", async (req, res, next) => {
    const carro = new Carro({
        marca: req.body.marca,
        modelo: req.body.modelo
    });
    //Verifica se carro já gravado
    try {
        await Carro.find({
            marca: carro.marca,
            modelo: carro.modelo
        })
            .select("marca modelo _id")
            .then(docs => {
                if (docs.length > 0) {
                    const error = {
                        message: "Carro já cadastrado",
                        carros: mapCarros(docs)
                    };
                    res.status(400).json(error);
                    throw new Error(error);
                }
            })
    } catch (err) {
        res.status(400).json(err);
    };

    //Carro não encontrado? segue com gravação
    carro.save()
        .then(result => {
            res.status(201).json({
                message: "Carro criado com sucesso",
                createdCarro: {
                    marca: result.marca,
                    modelo: result.modelo,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/api/carro/" + result._id
                    }
                }
            });
        }).catch(err => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(500).json({
                    error: err
                });
            }
        });
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