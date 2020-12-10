const express = require('express');
const router = express.Router();

const encomenda_controller = require('../controllers/encomenda.controller');


router.get('/getAll', encomenda_controller.findAll);

router.put('/:id/update', encomenda_controller.update);


module.exports = router;