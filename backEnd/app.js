const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const authRoutes = require('./routes/auth');
const cursosRoutes = require('./routes/cursos');
const uploadRoutes = require('./routes/upload');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middleware para permitir requisições de diferentes origens
app.use(cors());

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Rotas da autenticação
app.use('/auth', authRoutes);

// Rotas dos cursos
app.use('/cursos', cursosRoutes);

// Rota para upload de arquivos
app.use('/upload', uploadRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('Bem-vindo à sua aplicação!');
});

// Inicia o servidor na porta especificada no arquivo .env, ou na porta 3000 por padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
