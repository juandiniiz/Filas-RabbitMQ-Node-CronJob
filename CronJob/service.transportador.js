const request = require("request");

const hostname = 'http://localhost:3004/';
const path = 'orders';

exports.findDelivery = (freight_content_statement_key, callback) => {
    const params = `freight_content_statement_key=${freight_content_statement_key}`
    request(`${hostname}${path}?${params}`, (err, res, body) => {
        callback(body);
    })
    
}

exports.getAll = (callback) => {
    request(`${hostname}${path}`, (err, res, body) => {
        callback([body]);
    })
}
