var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listarDadosUsuario/:idUsuario", function(req, res) {
    usuarioController.listarDadosUsuario(req,res);
});

router.get("/listarDadosEmpresa/:idEmpresa", function(req, res) {
    usuarioController.listarDadosEmpresa(req,res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/empresa", function (req, res) {
    console.log("chegou na rota");
    usuarioController.empresa(req, res);
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

module.exports = router;