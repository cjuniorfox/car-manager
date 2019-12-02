const router = require('express').Router();
const Ficha = require('../model/fichaSchema');
require('../model/veiculoSchema');
const FichaController = require('../controller/FichaController');

router.get('/:id', FichaController.show);
router.post('/entrada', FichaController.entrada);

module.exports = router;