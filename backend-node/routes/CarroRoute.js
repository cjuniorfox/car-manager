const router = require('express').Router();
const CarroController = require('../controller/CarroController')

router.get("/buscar", CarroController.listAllCarros);//lista todos os carros da base
router.get("/", CarroController.listAllCarros); //Lista todos os carros da base
router.get("/buscar/:busca", CarroController.listCarrosByMarcaModelo);//Executa busca por marca ou modelo
router.get("/marca", CarroController.listByMarca); //Lista todas as marcas
router.get("/marca/:marca", CarroController.listByMarca); //Busca por marca
router.get("/:_id", CarroController.getCarroById); //Carro por ID
router.get("/:id_marca/:id_modelo", CarroController.getCarroMarcaModeloByIds); //Marca e modelo por id
router.post("/marca-modelo", CarroController.saveMarcaModeloSmart);
router.post("/", CarroController.saveCarro); //Insere nova marca de carro
router.post("/:_id", CarroController.saveModelo); //Insere modelo em determinada marca
router.patch("/:_id", CarroController.updateCarro); //Atualiza modelo de carro
router.patch("/:id_marca/:id_modelo", CarroController.updateModelo); //Atualiza modelo
router.delete("/:_id", CarroController.deleteCarro); //Remove montadora da base de dados
router.delete("/:id_marca/:id_modelo", CarroController.deleteModelo);

module.exports = router;