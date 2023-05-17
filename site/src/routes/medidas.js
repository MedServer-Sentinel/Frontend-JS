var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:mac", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});
router.get("/ultimas/cpu/:mac", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});
router.get("/ultimas/disco/:mac", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});



router.get("/tempo-real/:mac", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})
router.get("/tempo-real/disco/:mac", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCPU(req, res);
})
router.get("/tempo-real/cpu/:mac", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

module.exports = router;