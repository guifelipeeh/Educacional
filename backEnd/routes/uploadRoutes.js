const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const validateToken = require('../middleware/validateToken');

router.post('/foto-perfil', validateToken, uploadController.uploadFotoPerfil);
router.post('/video-aula', validateToken, uploadController.uploadVideoAula);
router.post('/documentos', validateToken, uploadController.uploadDocumentos);

module.exports = router;
