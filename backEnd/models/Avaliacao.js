const { DataTypes } = require('sequelize');
const sequelize = require('../configNodeMailler/database');
const Usuario = require('./Usuario');
const Curso = require('./Curso');

const Avaliacao = sequelize.define('Avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Curso,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  paranoid: true
});

Usuario.hasMany(Avaliacao, { foreignKey: 'usuarioId' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Curso.hasMany(Avaliacao, { foreignKey: 'cursoId' });
Avaliacao.belongsTo(Curso, { foreignKey: 'cursoId' });

module.exports = Avaliacao;
