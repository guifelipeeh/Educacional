const transporter = require('./nodemailler');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'guifelipeeh@outlook.com', // Substitua pelo email do destinatário
  subject: 'Test Email',
  text: 'Este é um email de teste',
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Erro ao enviar o email:', error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});
