const UploadService = require('./uploadService');

exports.uploadFotoPerfil = (req, res) => {
  const upload = UploadService.uploadSingleFile('fotoPerfil');

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ filePath: req.file.path });
  });
};

exports.uploadVideoAula = (req, res) => {
  const upload = UploadService.uploadSingleFile('videoAula');

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ filePath: req.file.path });
  });
};

exports.uploadDocumentos = (req, res) => {
  const upload = UploadService.uploadMultipleFiles('documentos', 10);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ files: req.files.map(file => file.path) });
  });
};
