const router = require('express').Router();
const pharmacyController = require('./pharmacy.controller');

router.post('/', pharmacyController.create);
router.get('/:id', pharmacyController.getById);
router.get('/', pharmacyController.getAll);
router.put('/:id', pharmacyController.update);
router.delete('/:id', pharmacyController.remove);

module.exports = router;
