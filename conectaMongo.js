const mongoose = require('mongoose');

//Conexão com o mongo
function init(params) {
    let url = 'mongodb://admin:admin@localhost:27017/admin?authSource=admin';
    let mongoDB = process.env.MONGODB_URI || url;

    mongoose.connect(mongoDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } );
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erro na Ligação ao MongoDB'))
}

module.exports = {init}
