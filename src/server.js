const express = require('express');
const connection = require('./db/conn');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Conectar ao banco de dados
connection();

// Configurar rotas
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
