const router = require('express').Router();
const authController = require('./auth.controller');

router.post('/signup', authController.signup );
router.post('/signin', authController.signin);

module.exports = router;
