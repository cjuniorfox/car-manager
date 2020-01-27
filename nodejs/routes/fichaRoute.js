const router = require('express').Router();
const FichaController = require('../controller/fichaController');
const VerifyToken = require('../util/verifyToken');

router.post('/entrada', VerifyToken.allowUser, FichaController.saveFichaEntrada);
router.get('/listar', VerifyToken.allowUser, FichaController.fichas);

module.exports = router;