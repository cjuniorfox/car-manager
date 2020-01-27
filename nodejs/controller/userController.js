const { User, RefreshToken } = require('../model/User');
const { registerValidation, loginValidation, refreshTokenValidation } = require('../validation/userValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const defineToken = (user) => {
    return {
        username: user.username,
        name: user.name,
        admin: user.admin,
        _id: user._id
    };
};

const sign = (user) => {
    return jwt.sign(defineToken(user), process.env.TOKEN_SECRET, { expiresIn: 1200 });
}

const defineUser = async (body) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(body.password, salt);
    return new User({
        name: body.name,
        tel: body.tel,
        username: body.username,
        password: hashedPass,
        admin: body.admin
    });
}

const defineRefreshToken = (req, user) => {
    return new RefreshToken({
        token: randToken.uid(256),
        user: user._id,
        created: {
            from: req.connection.remoteAddress
        }
    });
}

exports.create = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ "message": error.details[0].message });
    //Somente administradores podem criar perfis
    if (req.user && req.user.admin === false) {
        return res.status(401).send({ "message": "Somente administradores podem criar perfis" });
    }
    try {
        //Se não autenticado, só permite o cadastro se não exisitir perfil nenhum cadastrado
        //e perfil a ser criado seja administrador (criação de primeiro perfil)
        if (!req.user) {
            const hasUser = await User.find();
            if (hasUser.length > 0)
                return res.status(401).send({ "message": "Somente administradores autenticados podem criar perfis" });
            if (!req.body.admin || req.body.admin !== "true")
                return res.status(400).send({ "message": "Primeiro perfil a ser criado necessita ser administrador" });
        }
        //Verifica se login existe
        const loginExists = await User.findOne({ username: req.body.username });
        if (loginExists) return res.status(400).send({ 'message': 'usuário já cadastrado' });
        //Passada validações, criptografa senha e registra usuário.
        const user = defineUser(body);
        const savedUser = await user.save();
        res.status(201).send({
            "message": "Novo usuário armazenado com êxito",
            "_id": savedUser._id
        })
    } catch (err) { console.error(err); res.status(500).send(err) };
}

exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ "message": error.details[0].message });
    try {
        //Verifica se usuario existe
        const user = await User.findOne({ "username": req.body.username });
        if (!user) {
            return res.status(400).send({ "message": "Usuário ou senha inválidos" });
        }
        //Valida a senha
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send({ "message": "Usuário ou senha inválidos" });
        }
        const token = sign(user);
        //Cria refresh token
        //Deleta tokens existentes
        await RefreshToken.deleteMany({ user: user._id });
        const refreshToken = defineRefreshToken(req, user);
        await refreshToken.save()
        res.send({
            token: token,
            refreshtoken: refreshToken.token,
            message: 'Login realizado com sucesso'
        });
    } catch (err) { console.error(err); res.status(500).send(err) }
}

exports.refreshToken = async (req, res) => {
    const { error } = refreshTokenValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ "message": error.details[0].message });
    try {
        const refreshToken = await RefreshToken
            .findOneAndUpdate(
                { token: req.body.refreshtoken },
                { "$push": { updated: { "from": req.connection.remoteAddress } } })
            .populate('user');
        if (!refreshToken) {
            return res.status(401).send({ message: 'Token inválido' })
        }
        const token = sign(refreshToken.user);
        return res.send({
            token: token,
            refreshtoken: refreshToken.token,
            message: 'Token renovado com sucesso'
        });
    } catch (err) { console.error(err); res.status(500).send(err) }
}

exports.logout = async (req, res) => {
    try {
        const refreshToken = await RefreshToken.findOneAndDelete({ "user": req.user._id });
        if (!refreshToken) {
            return res.status(400).send({ "message": "Não foram encontradas sessões deste usuário" });
        }
        return res.status(200).send({ "message": "Logout realizado com sucesso." })
    } catch (err) { console.error(err); res.status(500).send(err) }
}