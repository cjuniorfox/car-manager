const router = require('express').Router();
const FichaController = require('../controller/fichaController');
const VerifyToken = require('../util/verifyToken');

router.post('/entrada', VerifyToken.allowUser, FichaController.saveFichaEntrada);

module.exports = router;