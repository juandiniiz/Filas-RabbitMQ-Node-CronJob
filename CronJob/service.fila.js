const request = require("request");
const http = require("http");

const hostname = 'http://localhost:4000/fila';
const path = '/insereFilaSaida';


exports.publicaFila = (mensagem, callback) => {
    request.post({ uri: `${hostname}${path}`, json:mensagem },(err, res, mensagem) => {
        callback(mensagem);
    })
}