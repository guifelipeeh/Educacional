const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const auth = require('../middleware/authMiddleware');
const level = require('../middleware/validarNivelAcesso');
const uploadController = require('../controllers/uploadController');

router.post('/upload/profile-picture', auth, upload.single('image'), uploadController.uploadProfilePicture);
router.post('/upload/video', auth, level, upload.single('video'), uploadController.uploadVideo);
router.post('/upload/document', auth, level, upload.single('document'), uploadController.uploadDocument);
router.get('/files', auth, level, uploadController.getUserFiles);

module.exports = router;
