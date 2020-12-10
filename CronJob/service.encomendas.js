const request = require("request");
const http = require("http");

const hostname = 'http://localhost:9000/encomenda';
const getAll = '/getAll';
const update = '/update';


exports.getAll = (callback) => {
    request(`${hostname}${getAll}`, (err, res, body) => {
        callback(body);
    })
}

exports.update = (entrega, callback) => {
    request.put({ uri: `${hostname}/${entrega._id}${update}`, json:entrega },(err, res, entrega) => {
        callback(entrega);
    })
}