// services/uploadService.js
const multer = require('multer');
const path = require('path');

// Configuração do armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    switch (file.fieldname) {
      case 'fotoPerfil':
        uploadPath = 'uploads/fotosPerfil';
        break;
      case 'videoAula':
        uploadPath = 'uploads/videosAula';
        break;
      case 'documentos':
        uploadPath = 'uploads/documentos';
        break;
      default:
        uploadPath = 'uploads/others';
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Configuração dos filtros de arquivos
const fileFilter = (req, file, cb) => {
  // Exemplo de filtro: apenas arquivos de imagem
  if (file.fieldname === 'fotoPerfil' && !file.mimetype.startsWith('image')) {
    cb(new Error('Apenas imagens são permitidas para fotoPerfil.'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

exports.uploadSingleFile = (fieldName) => upload.single(fieldName);
exports.uploadMultipleFiles = (fieldName, maxCount) => upload.array(fieldName, maxCount);
