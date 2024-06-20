const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, categoriaController.criarCategoria);
router.get('/', categoriaController.obterCategorias);
router.get('/:id', categoriaController.obterCategoriaPorId);
router.put('/:id', authMiddleware, categoriaController.atualizarCategoria);
router.delete('/:id', authMiddleware, categoriaController.deletarCategoria);

module.exports = router;
