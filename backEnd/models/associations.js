const Curso = require('./Curso');
const Aula = require('./Aula');
const Usuario = require('./Usuario');
const Sessao = require('./Sessao');

Curso.hasMany(Aula, { foreignKey: 'cursoId' });
Aula.belongsTo(Curso, { foreignKey: 'cursoId' });

Usuario.hasMany(Curso, { foreignKey: 'professorId' });
Curso.belongsTo(Usuario, { foreignKey: 'professorId' });

Usuario.hasMany(Sessao, { foreignKey: 'usuarioId' });
Sessao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = { Curso, Aula, Usuario, Sessao };
