const router = require('express').Router();

const ClienteController = require('../controller/ClienteController');

router.post('/',ClienteController.cadastro);

module.exports = router;