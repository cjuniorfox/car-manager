const router = require('express').Router();
const CarroController = require('../controller/carroController')
const VerifyToken = require('../util/verifyToken')

router.get("/buscar", VerifyToken.allowUser, CarroController.listCarrosByMarcaModeloAsTable);//lista todos os carros da base
router.get("/marca", VerifyToken.allowUser, CarroController.listMarcas); //Busca por marca
router.post("/", VerifyToken.allowUser, CarroController.saveMarcaModeloSmart);
router.get("/marca/:_id", VerifyToken.allowUser, CarroController.getCarro);
router.get("/modelo/:_id", VerifyToken.allowUser, CarroController.getModelo);
router.get("/modelo", VerifyToken.allowUser, CarroController.listModelos);
router.patch("/marca/:_id", VerifyToken.allowUser, CarroController.updateCarro); //Atualiza modelo de carro
router.patch("/modelo/:_id", VerifyToken.allowUser, CarroController.updateModelo); //Atualiza modelo
router.delete("/marca/:_id", VerifyToken.allowUser, CarroController.deleteCarro); //Remove montadora da base de dados
router.delete("/modelo/:_id", VerifyToken.allowUser, CarroController.deleteModelo);

module.exports = router;