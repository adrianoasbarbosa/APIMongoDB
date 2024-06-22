const mongoose = require('mongoose');

const connection = () => {
    const username = 'AdrianoBarbosa';
    const password = encodeURIComponent('SENHA'); // Codifique a senha se necessário
    const cluster = 'restapibd.uxpwj16.mongodb.net';
    const dbname = 'APIUSER';

    const uri = `mongodb+srv://AdrianoBarbosa:<SENHA>@restapibd.uxpwj16.mongodb.net/?retryWrites=true&w=majority&appName=RESTAPIBD`;

    mongoose.connect(uri)
        .then(() => console.log('Conectado ao banco de dados'))
        .catch(err => console.error('Erro ao conectar ao banco de dados', err));
};

module.exports = connection;

