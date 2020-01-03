const router = require('express').Router();

const ClienteController = require('../controller/clienteController');

router.post('/',ClienteController.saveCliente);

module.exports = router;