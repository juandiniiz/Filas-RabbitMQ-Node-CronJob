const Encomenda = require('../models/encomenda.model');


exports.createByFila = function (encomendaParams) {

    let encomenda = new Encomenda(encomendaParams);
    
    encomenda.save(function (err) {
        if (err) {
            
             return next(err);
        }
    })
};

exports.findAll = function (req, res) {
    Encomenda.find({ delivery: false}, function (err, encomenda) {
        if (err) return next(err);
        res.send(encomenda);
    })
};

exports.update = function (req, res) {
    Encomenda.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, encomenda) {
        if (err) return next(err);       
        res.send('Produto Atualizado.');
    });
};

