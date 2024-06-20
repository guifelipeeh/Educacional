const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const uploadController = require('../controllers/uploadController');

router.post('/upload/fotoPerfil', authMiddleware, uploadController.uploadFotoPerfil);
router.post('/upload/videoAula', authMiddleware, uploadController.uploadVideoAula);
router.post('/upload/documentos', authMiddleware, uploadController.uploadDocumentos);

module.exports = router;
