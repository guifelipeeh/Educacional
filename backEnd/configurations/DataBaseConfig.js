const { Sequelize } = require('sequelize');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria uma nova instância do Sequelize, passando as informações de conexão
const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Nome do banco de dados
  process.env.DB_USER,     // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Host do banco de dados
    dialect: 'mysql',           // Dialeto do banco de dados (no caso, MySQL)
    logging: false              // Desativa o log de SQL gerado pelo Sequelize
  }
);

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = sequelize;
