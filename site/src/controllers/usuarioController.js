var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarDadosUsuario(req, res) {

    var idUsuario = req.params.idUsuario

    usuarioModel.listarDadosUsuario(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarDadosEmpresa(req, res) {

    var idEmpresa = req.params.idEmpresa

    usuarioModel.listarDadosEmpresa(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined){
        res.status(400).send("Seu cpf está undefined!");
    }
     else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, cpf, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                    
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function empresa(req, res) {
    console.log("chegou na controller")
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeEmpresaServer;
    var email = req.body.emailEmpresaServer;
    var cnpj = req.body.cnpjEmpresaServer;
    var telefone = req.body.telefoneEmpresaServer;
    var responsavel = req.body.ResponsavelEmpresaServer;
    var cep = req.body.cepEmpresaServer;
    
console.log(nome,email,cnpj,telefone,responsavel,cep)

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else if (responsavel == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        console.log("aqui")
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.empresa(nome, cnpj,email, telefone,responsavel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o a atualizao! Erro: catch",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}
    
}
function updateUsuario(req, res) {
    console.log("chegou na controller")
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html


  
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.updateUsuario()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualizao! Erro: catch",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}
function atualizarParametroCpu(req, res) {
    console.log("chegou na controller")
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html


    var significativo = req.body.significativoCpu;
    var moderadoCpu = req.body.moderadoCpu;
    var criticoCpu = req.body.criticoCpu;
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    if (significativo == undefined || moderadoCpu == undefined || criticoCpu) {
        console(undefined)
    }
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.atualizarParametroCpu()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualizao! Erro: catch",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}

function update_email(){
    var email = req.body.email;
    var idUsuario = req.body.idUsuario;
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.update_email(email, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
}

function update_senha(){
    var senha = req.body.senha;
    var idUsuario = req.body.idUsuario;
    if (email == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.update_senha(senha, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
}

function update_cep(){
    var cep = req.body.cep;
    var idEmpresa = req.body.idEmpresa;
    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else {
        usuarioModel.update_cep(cep, idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
}


module.exports = {
    testar,
    entrar,
    cadastrar,
    listar,
    empresa,
    updateUsuario,
    listarDadosUsuario,
    listarDadosEmpresa,
    atualizarParametroCpu,
    update_email,
    update_senha,
    update_cep
}