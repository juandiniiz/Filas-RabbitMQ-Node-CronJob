const express = require('express');
const bodyParser = require('body-parser');
const encomenda = require('./routes/encomenda.route'); 
const mongo = require('../conectaMongo');

mongo.init();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/encomenda', encomenda);

let porta = 9000;
app.listen(porta, () => {
    console.log('Servidor em execução na porta ' + porta);
});

