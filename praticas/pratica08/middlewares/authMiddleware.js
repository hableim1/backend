const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Não autorizado' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.usuario = payload; 
        
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
}

function gerarToken(payload) {
    const expiresIn = '120s';

    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
    } catch (error) {
        throw new Error('Erro ao gerar o token');
    }
}

module.exports = {
    verificarToken,
    gerarToken
};
