const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth')

module.exports = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).send({ error: 'Não tem token' });
    const parts = authHeader.split(' ');
    if(!parts.lenght === 2)
        return res.status(401).send({ error: 'Token inválido' });
    const [ schema, token] = parts;

    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({ error: 'Verifique o formato do token' })
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Verifique seu token' })

    req.userId = decoded.id;
    return next();
    });
}