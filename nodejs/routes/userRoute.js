const router = require('express').Router();
const UserController = require('../controller/userController');
const VerifyToken = require('../util/verifyToken');

router.post('/', VerifyToken.allowAll, UserController.create);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);
router.get('/logout',VerifyToken.allowUser, UserController.logout);

module.exports = router;