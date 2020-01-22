const jwt = require('jsonwebtoken');

/**
 * Autentica apenas administradores
 */
exports.allowAdmin = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).send({ "message": "Usuário não atenticado" });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verifified.admin)
            return res.status(401).send({ "message": "Usuário autenticado não é administrador" })
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send({
            "message": "Erro de autenticação. Token inválido",
            "error": err
        });
    }
}

/**
 * Autentica usuários e administradores
 */
exports.allowUser = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).send({ "message": "Usuário não atenticado" });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send({
            "message": "Erro de autenticação. Token inválido",
            "error": err
        });
    }
}
/**
 * Autentica permitindo acesso de usuários não autenticados, 
 * Impede o acesso a tokens inválidos.
 */
exports.allowAll = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        next();
        return null;
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send({
            "message": "Erro de autenticação. Token inválido",
            "error": err
        });
    }
}