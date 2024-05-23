const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const validateToken = require('../middleware/validateToken');

router.post('/', validateToken, cursoController.criarCurso);
router.get('/', cursoController.obterCursos);
router.get('/:id', cursoController.obterCursoPorId);
router.put('/:id', validateToken, cursoController.atualizarCurso);
router.delete('/:id', validateToken, cursoController.deletarCurso);

module.exports = router;
