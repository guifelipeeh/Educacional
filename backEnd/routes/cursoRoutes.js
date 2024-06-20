const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../middleware/authMiddleware');
const validarCursoCriacao = require('../middleware/validarCursoCriacao');
const validarCursoAtualizacao = require('../middleware/validarCursoAtualizaçao');
const validarNivelAcesso = require('../middleware/validarNivelAcesso');
const validarSessao = require('../middleware/sessionMiddleware');

router.post('/', authMiddleware, validarSessao, validarNivelAcesso, validarCursoCriacao, cursoController.criarCurso);
router.get('/', cursoController.obterCursos);
router.get('/:id', cursoController.obterCursoPorId);
router.put('/:id', authMiddleware, validarSessao, validarNivelAcesso, validarCursoAtualizacao, cursoController.atualizarCurso);
router.delete('/:id', authMiddleware, validarSessao, validarNivelAcesso, cursoController.deletarCurso);

module.exports = router;
