const cron = require("node-cron");
const express = require("express");
const apiEncomenda = require("./service.encomendas");
const apiTransportador = require("./service.transportador");
const apiFila = require("./service.fila");

app = express();

// CRON JOB EXECUTANDO DE UM EM UM MINUTO
cron.schedule("* * * * *", () => {

// CRON JOB EXECUTANDO A CADA 2 HORAS
//cron.schedule("0 */2 * * *", () => {   
  

    apiEncomenda.getAll(function(resultado) {
    
            let encomendas = JSON.parse(resultado)
            
            encomendas.forEach(encomenda => {
                
                apiTransportador.findDelivery(encomenda.freight_content_statement_key, function (delivery) {
                    console.log(delivery);                                       
                    if ( delivery !== undefined ){

                        let deliveryResponse = JSON.parse(delivery)                            

                        //console.log(deliveryResponse[0].delivery);

                        if (deliveryResponse[0].delivery == true){
                            encomenda.delivery = deliveryResponse[0].delivery                         
                            apiEncomenda.update(encomenda, (resultadoUpdate) => {
                                //console.log(resultadoUpdate)
                            
                                delete encomenda.__v;
                                delete encomenda._id;
                                const encomendaFila = Object.assign(encomenda, deliveryResponse[0].events[0]);
                            
                                apiFila.publicaFila(encomendaFila, (resultado) => {
                                    console.log(`Objeto inserido na fila \n` + JSON.stringify(encomendaFila) + `\n\n`, resultado)
                                })
                            })
                        }  
                    }
                
                })
                
            });      
    });
    console.log("Executando a tarefa a cada 2 minuto")
   
});
    
app.listen(1313);