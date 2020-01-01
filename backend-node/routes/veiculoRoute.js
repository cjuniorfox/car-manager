const router = require('express').Router();

VeiculoController = require('../controller/VeiculoController');

router.get('/', VeiculoController.list)
router.get('/:id', VeiculoController.show);
router.post('/', VeiculoController.post);

module.exports = router;