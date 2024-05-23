const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const aulaRoutes = require('./routes/aulaRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middleware para permitir requisições de diferentes origens
app.use(cors());

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/aulas', aulaRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('Bem-vindo à sua aplicação!');
});

// Sincroniza com o banco de dados e inicia o servidor
const PORT = process.env.PORT || 3000;
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Erro ao sincronizar com o banco de dados:', error);
});
