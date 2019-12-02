const router = require('express').Router();
const VeiculoController = require('../controller/VeiculoController');

router.get('/',VeiculoController.index);
router.get('/:id',VeiculoController.show);
router.post('/',VeiculoController.insert);

module.exports = router;