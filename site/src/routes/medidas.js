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
router.get("/Dias/Ram/:mac", function (req, res) {
    medidaController.buscarBarraRam(req, res);
});
router.get("/Dias/Disco/:mac", function (req, res) {
    medidaController.buscarBarraDisco(req, res);
});
router.get("/hora/Ram/:mac", function (req, res) {
    medidaController.buscarBarraRam2(req, res);
});
router.get("/hora/Disco/:mac", function (req, res) {
    medidaController.buscarBarraDisco2(req, res);
});


router.get("/tempo-real/:mac", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})
router.get("/tempo-real/disco/:mac", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})
router.get("/tempo-real/cpu/:mac", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCPU(req, res);
})

router.get("/parametros/:mac", function (req, res) {
    console.log('rota')
    medidaController.buscarParemetros(req, res);
})

router.get("/alertsRam/:mac/:criticoParams", function (req, res) {
    medidaController.buscaralertsTempoRealram(req, res);
})
router.get("/MaxRam/:mac/:criticoParams", function (req, res) {
    medidaController.MaxRam(req, res);
})
router.get("/alertsDisco/:mac/:critico", function (req, res) {
   
    medidaController.buscaralertsTempoRealDisco(req, res);
})
router.get("/MaximoDisco/:mac/:criticoParams", function (req, res) {
    medidaController.MaxDisco(req, res);
})




module.exports = router;