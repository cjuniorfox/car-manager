const router = require('express').Router();
const CarroController = require('../controller/carroController')

router.get("/buscar", CarroController.listCarrosByMarcaModeloAsTable);//lista todos os carros da base
router.get("/marca", CarroController.listMarcas); //Busca por marca
router.post("/", CarroController.saveMarcaModeloSmart);
router.get("/marca/:_id", CarroController.getCarro);
router.get("/modelo/:_id", CarroController.getModelo);
router.get("/modelo", CarroController.listModelos);
router.patch("/marca/:_id", CarroController.updateCarro); //Atualiza modelo de carro
router.patch("/modelo/:_id", CarroController.updateModelo); //Atualiza modelo
router.delete("/marca/:_id", CarroController.deleteCarro); //Remove montadora da base de dados
router.delete("/modelo/:_id", CarroController.deleteModelo);

module.exports = router;