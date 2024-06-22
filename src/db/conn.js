const mongoose = require('mongoose');

const connection = () => {
    const username = 'USERNAME';
    const password = encodeURIComponent('SENHA'); // Codifique a senha se necessário
    const cluster = 'CLUSTERNAME';
    const dbname = 'DBNAME';

    const uri = `mongodb+srv://USERNAME:<SENHA>@CLUSTERNAME/?retryWrites=true&w=majority&appName=RESTAPIBD`;

    mongoose.connect(uri)
        .then(() => console.log('Conectado ao banco de dados'))
        .catch(err => console.error('Erro ao conectar ao banco de dados', err));
};

module.exports = connection;

