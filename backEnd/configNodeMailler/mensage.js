function generateEmailTemplate(newPassword) {
    return `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperação de Senha - Educacional APP</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 10px 0;
          }
          .header h1 {
            margin: 0;
            color: #333333;
          }
          .content {
            margin: 20px 0;
            line-height: 1.6;
            color: #555555;
          }
          .footer {
            text-align: center;
            padding: 10px 0;
            color: #777777;
            font-size: 0.9em;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .btn:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Educacional APP</h1>
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir sua senha no <strong>Educacional APP</strong>.</p>
            <p>Sua nova senha temporária é:</p>
            <p style="text-align: center; font-size: 1.5em; color: #28a745;">${newPassword}</p>
            <p>Recomendamos que você altere esta senha após o login para garantir a segurança da sua conta.</p>
            <p>Se você não solicitou a recuperação de senha, por favor, entre em contato com nosso suporte imediatamente.</p>
            <p>Atenciosamente,<br>Equipe Educacional APP</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Educacional APP. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  module.exports = generateEmailTemplate;
  