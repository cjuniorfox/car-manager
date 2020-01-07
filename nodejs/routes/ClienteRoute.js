const router = require('express').Router();

const ClienteController = require('../controller/clienteController');

router.get('/buscar', ClienteController.listCliente);
router.get('/:_id',ClienteController.getCliente);
router.post('/',ClienteController.saveCliente);
router.patch('/:_id',ClienteController.patchCliente);
router.delete('/:_id',ClienteController.deleteCliente);

module.exports = router;