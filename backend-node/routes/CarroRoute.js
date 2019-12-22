const router = require('express').Router();
const CarroController = require('../controller/CarroController');

router.get('/',CarroController.index);
router.get('/:id',CarroController.show);
router.post('/',CarroController.insert);

module.exports = router;