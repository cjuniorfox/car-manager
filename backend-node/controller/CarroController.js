Carro = require('../model/Carro');

const CarroController = {
    async index(req, res) {
        const carros = await Carro
            .find()
            .populate('carros');
        res.send(carros);
    },
    async show(req, res) {
        const carro = await Carro
            .findById(req.params.id)
            .populate('carros');
        res.send(carro);
    },
    async post(req, res) {
        const carro = new Carro({
            marca : req.body.marca,
            modelo : req.body.modelo
        });
        carro
            .save()
            .then(
                result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Carro criado com sucesso",
                        createdObject : {
                            marca : result.marca,
                            modelo: result.modelo
                            _id: result
                        }
                    });
                }
            )
    },
    async insert(req, res) {
        const carro = new Carro({
            marca: req.body.marca,
            modelo: req.body.modelo
        });
        try {
            const carroDb = await Carro.find({
                marca: carro.marca,
                modelo: carro.modelo
            }
            );
            if (carroDb.length > 0) {
                throw new Error({ message: "Carro " + carro.marca + " - " + carro.modelo + " já cadastrado" });
            }
            const savedCarro = await carro.save();
            res.send(savedCarro);
        } catch (err) {
            res.status(400).send({message:err});
        }

    }
};

module.exports = CarroController;