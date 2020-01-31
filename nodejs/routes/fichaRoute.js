const router = require('express').Router();
const FichaController = require('../controller/fichaController');
const VerifyToken = require('../util/verifyToken');

router.post('/entrada', VerifyToken.allowUser, FichaController.post);
router.get('/listar', VerifyToken.allowUser, FichaController.fichas);
router.post('/:_id/add-servico', VerifyToken.allowUser, FichaController.addServico);
router.patch('/:_id/:servico_id',VerifyToken.allowUser, FichaController.updateServico);
router.get('/:_id',VerifyToken.allowUser, FichaController.get);

module.exports = router;