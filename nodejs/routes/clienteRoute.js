const router = require('express').Router();
const VerifyToken = require('../util/verifyToken');
const ClienteController = require('../controller/clienteController');

router.get('/buscar', VerifyToken.allowUser, ClienteController.listCliente);
router.get('/:_id',VerifyToken.allowUser,ClienteController.getCliente);
router.post('/',VerifyToken.allowUser,ClienteController.saveCliente);
router.put('/:_id',VerifyToken.allowUser,ClienteController.putCliente);
router.delete('/:_id',VerifyToken.allowUser,ClienteController.deleteCliente);

module.exports = router;