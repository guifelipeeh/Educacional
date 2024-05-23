const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const validateToken = require('../middleware/validateToken');

router.post('/', validateToken, categoriaController.criarCategoria);
router.get('/', categoriaController.obterCategorias);
router.get('/:id', categoriaController.obterCategoriaPorId);
router.put('/:id', validateToken, categoriaController.atualizarCategoria);
router.delete('/:id', validateToken, categoriaController.deletarCategoria);

module.exports = router;
