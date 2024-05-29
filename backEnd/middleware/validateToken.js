const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
   
    const authorizationHeader = req.headers.authorization;

   
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }


    const token = authorizationHeader.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticação inválido.' });
    }
}

module.exports = validateToken;
