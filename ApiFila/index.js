const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const fila = require('./routes/fila.route'); 
 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
 
app.use('/fila', fila);

 
let porta = 4000;
app.listen(porta, () => {
    console.log('Servidor em execução na porta ' + porta);
}); 