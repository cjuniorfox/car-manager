const router = require('express').Router();

VeiculoController = require('../controller/VeiculoController');

router.get('/:id', VeiculoController.show);
router.post('/', VeiculoController.post);

module.exports = router;