const validarNivelAcesso = (req, res, next) => {
  const { usuario } = req;

  console.log('Usuario no validarNivelAcesso:', usuario);

  if (!usuario) {
    return res.status(403).json({ error: 'Acesso não autorizado' });
  }

  if (usuario.tipo === 'professor' || usuario.tipo === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso não autorizado' });
  }
};

module.exports = validarNivelAcesso;
