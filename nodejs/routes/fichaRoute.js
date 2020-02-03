const router = require('express').Router();
const FichaController = require('../controller/fichaController');
const VerifyToken = require('../util/verifyToken');

router.post('/entrada', VerifyToken.allowUser, FichaController.post);
router.get('/listar', VerifyToken.allowUser, FichaController.fichas);
router.post('/:_id/add-servico', VerifyToken.allowUser, FichaController.addServico);
router.put('/:_id/:servico_id',VerifyToken.allowUser, FichaController.putServico);
router.put('/:_id',VerifyToken.allowUser, FichaController.put);
router.get('/:_id',VerifyToken.allowUser, FichaController.get);

module.exports = router;