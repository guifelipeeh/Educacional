const multer = require('multer');
const path = require('path');

// Configuração de armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Obter a extensão do arquivo original
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Nome do arquivo final
  }
});

// Filtro para aceitar apenas determinados tipos de arquivos
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image' && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Somente imagens são permitidas!'), false);
  } else if (file.fieldname === 'video' && !file.originalname.match(/\.(mp4|avi|mkv)$/)) {
    return cb(new Error('Somente vídeos são permitidos!'), false);
  } else if (file.fieldname === 'document' && !file.originalname.match(/\.(txt|pdf|zip)$/)) {
    return cb(new Error('Somente arquivos de texto, PDF ou ZIP são permitidos!'), false);
  }
  cb(null, true);
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 20 // Limite de 20MB por arquivo
  }
});

module.exports = upload;
