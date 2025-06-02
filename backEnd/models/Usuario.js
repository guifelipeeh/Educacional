const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/DataBaseConfig');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['aluno', 'professor', 'admin']]
    }
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    }
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\(\d{2}\) \d{4,5}-\d{4}$/
    }
  }
  
}, {
  timestamps: true,
  paranoid: true
});

module.exports = Usuario;
