const router = require('express').Router();
const FichaController = require('../controller/fichaController');
const VerifyToken = require('../util/verifyToken');

router.post('/entrada', VerifyToken.allowUser, FichaController.saveFichaEntrada);
router.get('/fichas-ativas', VerifyToken.allowUser, FichaController.fichasAtivas);

module.exports = router;