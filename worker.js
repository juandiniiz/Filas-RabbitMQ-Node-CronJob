console.log("Worker Iniciado");
const mongoose = require('mongoose');
const encomendaController = require('./ApiEncomenda/controllers/encomenda.controller');
const filaController = require('./ApiFila/controllers/fila.controller');
const mongo = require('./conectaMongo');

mongo.init();

// Consumo da fila de entrada e inserção no mongodb    
filaController.consume("fila_entrada", res => {
    const result = JSON.parse(res.content);
    console.log(result);  
    result.forEach(element => {
        try {        
             
            encomendaController.createByFila(element);
        } catch (error) {
            //FIXME implementar volta para fila em caso de erro
        }
    });
})