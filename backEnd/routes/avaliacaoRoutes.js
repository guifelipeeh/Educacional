const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const validateToken = require('../middleware/validateToken');




router.post('/', validateToken, avaliacaoController.criarAvaliacao);
router.get('/', validateToken,avaliacaoController.obterAvaliacoes);
router.get('/:id', validateToken,avaliacaoController.obterAvaliacaoPorId);
router.put('/:id', validateToken, avaliacaoController.atualizarAvaliacao);
router.delete('/:id', validateToken, avaliacaoController.deletarAvaliacao);

module.exports = router;
