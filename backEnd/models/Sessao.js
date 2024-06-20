const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/DataBaseConfig');
const Usuario = require('./Usuario');

const Sessao = sequelize.define('Sessao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiracao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Define um valor padrão para o campo 'expiracao'
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Definição das associações
Usuario.hasMany(Sessao, { foreignKey: 'usuarioId' });
Sessao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Sessao;
