const express = require('express');
const router = express.Router();
const aulaController = require('../controllers/AulaController');
const authMiddleware = require('../middleware/authMiddleware');
const validarCurso = require('../middleware/validateCurso');
const validarAula = require('../middleware/validarAula');

router.post('/', authMiddleware, validarAula, aulaController.criarAula);
router.get('/', authMiddleware, validarAula,aulaController.obterAulas);
router.get('/:id', authMiddleware, validarAula,aulaController.obterAulaPorId);
router.put('/:id', authMiddleware, validarAula, aulaController.atualizarAula);
router.delete('/:id', authMiddleware, validarAula, aulaController.deletarAula);

module.exports = router;
