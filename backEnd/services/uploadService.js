const uploadService = require('../services/uploadService');

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await uploadService.saveFile(userId, req.file, 'images');
    res.status(200).json({ message: 'Foto de perfil enviada com sucesso!', file: result });
  } catch (error) {
    console.error('Erro ao enviar a foto de perfil:', error);
    res.status(400).json({ error: 'Erro ao enviar a foto de perfil' });
  }
};

const uploadVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await uploadService.saveFile(userId, req.file, 'videos');
    res.status(200).json({ message: 'Vídeo enviado com sucesso!', file: result });
  } catch (error) {
    console.error('Erro ao enviar o vídeo:', error);
    res.status(400).json({ error: 'Erro ao enviar o vídeo' });
  }
};

const uploadDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await uploadService.saveFile(userId, req.file, 'documents');
    res.status(200).json({ message: 'Documento enviado com sucesso!', file: result });
  } catch (error) {
    console.error('Erro ao enviar o documento:', error);
    res.status(400).json({ error: 'Erro ao enviar o documento' });
  }
};

const getUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await uploadService.getUserFiles(userId);
    res.status(200).json(files);
  } catch (error) {
    console.error('Erro ao buscar arquivos do usuário:', error);
    res.status(400).json({ error: 'Erro ao buscar arquivos do usuário' });
  }
};

module.exports = { uploadProfilePicture, uploadVideo, uploadDocument, getUserFiles };
