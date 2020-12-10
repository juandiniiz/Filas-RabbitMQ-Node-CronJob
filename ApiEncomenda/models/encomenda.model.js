const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let EncomendaShema = new Schema({
    freight_order_id: {type: String, required: true, max: 100},
    freight_content_statement_key: {type: String, required: true},
    shipping_integration_id: {type: String, required: true},
    shipping_integration_type: {type: String, required: true},
    delivery: {type: Boolean, required: false},
});


// Exportar o modelo
module.exports = mongoose.model('Encomenda', EncomendaShema);
