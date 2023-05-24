var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 10;

    var mac = req.params.mac;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(mac, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarUltimasMedidasCPU(req, res) {

    const limite_linhas = 10;

    var mac = req.params.mac;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasCPU(mac, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasDisco(req, res) {

    const limite_linhas = 10;

    var mac = req.params.mac;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasDisco(mac, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var mac = req.params.mac;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(mac).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealCPU(req, res) {

    var mac = req.params.mac;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(mac).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealDisco(req, res) {

    var mac = req.params.mac;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealDisco(mac).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarParemetros(req, res) {
    console.log(`Recuperando parametros em tempo real`);

    var mac = req.params.mac;
    medidaModel.buscarParemetros(mac).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log(resultado+"parametros");
            
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscaralertsTempoRealram(req, res) {
    console.log(`Recuperando alerts`);
    var mac = req.params.mac;
    var critico = req.params.criticoParams
   

    medidaModel.buscaralertsTempoRealram(mac,critico).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
        
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas buscar alerts.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function MaxRam(req, res) {
    console.log(`Recuperando alerts`);
    var mac = req.params.mac;
    var critico = req.params.criticoParams

    medidaModel.MaxRam(mac,critico).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
          
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas buscar max ram.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscaralertsTempoRealDisco(req, res) {
    console.log(`Recuperando alerts do discooooooooooooooooo`);
    var mac = req.params.mac;
    var critico = req.params.criticoParams
    console.log(critico + "e o mac e " + mac)

    medidaModel.buscaralertsTempoRealDisco(mac,critico).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
        
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas buscar alerts.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function MaxDisco(req, res) {
    console.log(`Recuperando alerts`);
    var mac = req.params.mac;
    var critico = req.params.criticoParams

    medidaModel.MaxDisco(mac,critico).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
          
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas buscar max ram.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasDisco,

    buscarMedidasEmTempoReal,
    buscarMedidasEmTempoRealCPU,
    buscarMedidasEmTempoRealDisco,

    buscarParemetros,
    buscaralertsTempoRealram,
    buscaralertsTempoRealDisco,
    MaxRam,
    MaxDisco,

}