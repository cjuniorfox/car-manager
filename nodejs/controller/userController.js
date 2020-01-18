const { User } = require('../model/userSchema');
const { registerValidation, loginValidation } = require('../validation/userValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.create = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (typeof error !== 'undefined')
        return res.status(400).send({ "message": error.details[0].message });
    //Somente administradores podem criar perfis
    if (req.user && req.user.admin === false) {
        return res.status(400).send({ "message": "Somente administradores podem criar perfis" });
    }
    try {
        //Se não autenticado, só permite o cadastro se não exisitir perfil nenhum cadastrado
        //e perfil a ser criado seja administrador (criação de primeiro perfil)
        if (!req.user) {
            const hasUser = await User.find();
            if (hasUser.length > 0)
                return res.status(400).send({ "message": "Somente administradores autenticados podem criar perfis" });
            if (!req.body.admin || req.body.admin !== "true")
                return res.status(400).send({ "message": "Primeiro perfil a ser criado necessita ser administrador" });
        }
        //Verifica se login existe
        const loginExists = await User.findOne({ username: req.body.username });
        if (loginExists) return res.status(400).send({ 'message': 'usuário já cadastrado' });
        //Passada validações, criptografa senha e registra usuário.
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            tel: req.body.tel,
            username: req.body.username,
            password: hashedPass,
            admin: req.body.admin
        });
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
        const token = jwt.sign({
            username: user.username,
            admin: user.admin,
            _id: user._id
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ "message": "Login realizado com sucesso" });
    } catch (err) { console.error(err); res.status(500).send(err) }
}