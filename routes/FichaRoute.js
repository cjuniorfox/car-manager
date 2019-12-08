const router = require('express').Router();

const FichaController = require('../controller/FichaController');

router.get('/:id', FichaController.show);
router.post('/', FichaController.entrada);

module.exports = router;