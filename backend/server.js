const express = require('express');
const cors = require('cors');
const db = require('./db');


const app = express();
const PORT = 5000; // O servidor vai rodar nessa porta

// Middleware 
app.use(cors());
app.use(express.json());



//Rota GET: busca os produtos do muSQL
app.get('/api/produtos', async(req, res) => {
    
    try {
        // Executa a query SQL no banco de dados
        const [linhas] = await db.query('SELECT * FROM produtos');

        res.json(linhas); // returna as linhas encontradas em formato JSON

    } catch (error) {
        console.log("Erro ao buscar produtos:", error);

        res.status(500).json({error: "Erro interno no servidor ao buscar produtos"});
    
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando lindamente na porta ${PORT}`);
})