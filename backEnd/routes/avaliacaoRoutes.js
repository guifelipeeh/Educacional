const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, avaliacaoController.criarAvaliacao);
router.get('/', authMiddleware, avaliacaoController.obterAvaliacoes);
router.get('/:id', authMiddleware, avaliacaoController.obterAvaliacaoPorId);
router.put('/:id', authMiddleware, avaliacaoController.atualizarAvaliacao);
router.delete('/:id', authMiddleware, avaliacaoController.deletarAvaliacao);

module.exports = router;
