const router = require('express').Router();
const userController = require('./user.controller');

router.get('/:id', userController.getById);
router.get('/', userController.getAllUser);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
