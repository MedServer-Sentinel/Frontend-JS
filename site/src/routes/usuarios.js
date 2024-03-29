var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});
router.get("/listarDias/:mac", function (req, res) {
    usuarioController.listarDias(req, res);
});
router.get("/buscarMaior/:mac", function (req, res) {
    usuarioController.buscarMaior(req, res);
});
router.get("/MediaRam/:mac", function (req, res) {
    console.log('passou aqui')
    usuarioController.mediasRam(req, res);
});
router.get("/MediaCPU/:mac", function (req, res) {
    usuarioController.mediasCPU(req, res);
});
router.get("/MediaDisco/:mac", function (req, res) {
    usuarioController.mediasDisco(req, res);
});

router.get("/listarDadosUsuario/:idUsuario", function(req, res) {
    usuarioController.listarDadosUsuario(req,res);
});

router.get("/listarComputadores/:nomeEmpresa", function(req, res) {
    usuarioController.listarComputadores(req,res);
});
router.get("/selectComputadores/:nomeEmpresa", function(req, res) {
    usuarioController.selectComputadores1(req,res);
});
router.get("/listarHospitais/:cnpj", function(req, res) {
    usuarioController.listarHospitais(req,res);
});

router.get("/listarDadosEmpresa/:idEmpresa", function(req, res) {
    usuarioController.listarDadosEmpresa(req,res);
});

router.get("/listarEmpresas/:idEmpresa", function(req, res) {
    usuarioController.listarEmpresas(req,res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})
router.post("/cadastrarUsuario/:idEmpresa", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/cadastroMaquina", function (req, res) {
    usuarioController.cadastroMaquina(req, res);
})

router.post("/empresa", function (req, res) {
    console.log("chegou na rota");
    usuarioController.empresa(req, res);
})

router.post("/filial/:idEmpresa", function (req, res) {
    usuarioController.filial(req, res);
})

router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.put("/updateUsuario", function (req, res) {
    usuarioController.updateUsuario(req, res);
})
router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});
router.post("/inserirParametro/:fkmaquina", function (req, res) {
    usuarioController.inserirParametro(req, res);
});
router.put("/parametros/:id", function (req, res) {
    usuarioController.atualizarParametroRam(req, res);
});

router.put("/updateSenha", function (req, res) {
    usuarioController.updateSenha(req, res);
});

router.put("/updateCep", function (req, res) {
    usuarioController.updateCep(req, res);
});


router.put("/updateEmail", function (req, res) {
    usuarioController.updateEmail(req, res);
});
router.put("/updateCor", function (req, res) {
    usuarioController.updateCor(req, res);
});
router.get("/buscarCorRed/:nome", function (req, res) {
    usuarioController.corRED(req, res);
});
router.get("/buscarCorGreen/:nome", function (req, res) {
    usuarioController.corGreen(req, res);
});
router.get("/buscarCorOrange/:nome", function (req, res) {
    usuarioController.corOrange(req, res);
});
router.get("/buscarCorYellow/:nome", function (req, res) {
    usuarioController.corYellow(req, res);
});


module.exports = router;