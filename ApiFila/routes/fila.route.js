const express = require('express');
const router = express.Router();

const filaController = require('../controllers/fila.controller');


router.post('/insereFilaEntrada', (req, res) => {
    filaController.sendQueue("fila_entrada", req.body);    
    res.json({Resultado: 'Sua mensagem foi inserida na fila de entrada'});
});

router.post('/insereFilaSaida', (req, res) => {  
    filaController.sendQueue("fila_saida", req.body);    
    res.json({Resultado: 'Sua mensagem foi inserida na fila de saída'});
});


module.exports = router;