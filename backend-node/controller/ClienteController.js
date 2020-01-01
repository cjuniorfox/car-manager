Cliente = require('../model/ClienteSchema');

const ClienteController = {
    async cadastro(req,res){
        const cliente = new Cliente({
            nome: req.body.nome,
            telefone: req.body.telefone,
            documento: req.body.documento,
            veiculos: req.body.veiculos
        });
        try{
            savedCliente = await cliente.save();
            await savedCliente
                .populate('veiculos')
                .execPopulate();
            await savedCliente
                .populate('veiculos.carro')
                .execPopulate();
                
            res.send(savedCliente);
        }catch(err){
            res.status(400).send(err);
        };
    }
}

module.exports = ClienteController;