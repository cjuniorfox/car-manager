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
    async insert(req, res) {
        const carro = new Carro({
            marca: req.body.marca,
            modelo: req.body.modelo
        });
        try {
            const savedCarro = await carro.save();
            res.send(carro);
        } catch (err) {
            res.status(400).send(err);
        }

    }
};

module.exports = CarroController;