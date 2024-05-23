


const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    // Extrair o token do cabeçalho Authorization
    const token = req.headers.authorization;

    // Verificar se o token está presente
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    try {
        // Verificar se o token é válido
        jwt.verify(token, process.env.JWT_SECRET);
        next(); // Prosseguir para o próximo middleware
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticação inválido.' });
    }
}

module.exports = validateToken;
