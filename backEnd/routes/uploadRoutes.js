// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken')
const uploadController = require('../controllers/uploadController');

router.post('/upload/fotoPerfil', uploadController.uploadFotoPerfil);
router.post('/upload/videoAula', uploadController.uploadVideoAula);
router.post('/upload/documentos', uploadController.uploadDocumentos);

module.exports = router;
