const router = require('express').Router();
const FichaController = require('../controller/fichaController');

router.post('/entrada',FichaController.saveFichaEntrada);

module.exports = router;