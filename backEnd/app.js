const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./configNodeMailler/database');
require('./models/associations'); 
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const aulaRoutes = require('./routes/aulaRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes'); // Importando as rotas de compras

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
app.use('/api/compras', purchaseRoutes); // Usando as rotas de compras

// Rota padrão
app.get('/', (req, res) => {
  res.send(`
    <body style="display:flex; border-radius:4px; margin:0 auto; align-items:center; justify-content:center; background-color:white; font-family:cursive; text-align:center; height:100vh; position:relative;">
      <div id="welcomeMessage" style="background-color:orange; border-radius:20px; text-align:center; margin-top:50px; height:100px; width:300px; color:black; display:flex; align-items:center; justify-content:center; animation: pulse 2s infinite; position:absolute; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        Bem vindo Developer
      </div>
      <style>
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        body {
          overflow: hidden;
        }
      </style>
      <script>
        const message = document.getElementById('welcomeMessage');
        
        function getRandomColor() {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        document.body.addEventListener('mousemove', (e) => {
          const rect = message.getBoundingClientRect();
          const offsetX = rect.width / 2;
          const offsetY = rect.height / 2;
          let newX = e.clientX - offsetX;
          let newY = e.clientY - offsetY;

          // Ensure the div stays within the bounds of the body
          if (newX < 0) newX = 0;
          if (newX > window.innerWidth - rect.width) newX = window.innerWidth - rect.width;
          if (newY < 0) newY = 0;
          if (newY > window.innerHeight - rect.height) newY = window.innerHeight - rect.height;

          message.style.left = newX + 'px';
          message.style.top = newY + 'px';

          // Change color if the div touches the borders
          if (newX <= 0 || newX >= window.innerWidth - rect.width || newY <= 0 || newY >= window.innerHeight - rect.height) {
            message.style.backgroundColor = getRandomColor();
          }
        });
      </script>
    </body>
  `);
});

// Sincroniza com o banco de dados e inicia o servidor
const PORT = 3001;
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Erro ao sincronizar com o banco de dados:', error);
});
