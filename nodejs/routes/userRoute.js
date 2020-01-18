const router = require('express').Router();
const UserController = require('../controller/userController');
const verifyToken = require('../util/verifyToken');

router.post('/', verifyToken.allowAll, UserController.create);
router.post('/login', UserController.login);

module.exports = router;