const express = require('express');
const router = express.Router();
const aulaController = require('../controllers/AulaController');
const validateToken = require('../middleware/validateToken');


router.post('/', validateToken, aulaController.criarAula);
router.get('/',validateToken, aulaController.obterAulas);
router.get('/:id', validateToken,aulaController.obterAulaPorId);
router.put('/:id', validateToken, aulaController.atualizarAula);
router.delete('/:id', validateToken, aulaController.deletarAula);

module.exports = router;
