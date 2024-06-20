const nodemailer = require('nodemailer');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});




module.exports = transporter;
