var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT usuario.*, empresa.cnpj FROM empresa JOIN usuario ON fkEmpresa = idempresa WHERE usuario.email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, cpf, senha, tipo) VALUES ('${nome}', '${email}', '${cpf}', '${senha}','Padrão');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastroMaquina(nome, ipv4, mac, MatrizOuFilial, tipo, andar, setor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, ipv4, mac, MatrizOuFilial, tipo, andar, setor);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO  Maquina (nome, ipv4, Tipo, cod_MAC, andar, setor, fk_empresa) VALUES ('${nome}', '${ipv4}', '${tipo}', '${mac}','${andar}', '${setor}', '${MatrizOuFilial}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function empresa(nome, cnpj, email, telefone, responsavel, cep) {
    console.log('chegou aqui na empresa')
   

    var instrucao = `
    INSERT INTO empresa (nome, cnpj , email, telefone, responsavel, cep) VALUES ('${nome}','${cnpj}', '${email}','${telefone}','${responsavel}', '${cep}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function filial(nome, email,cnpj, telefone, responsavel, cep, idEmpresa) {
    console.log('chegou aqui na empresa')
   

    var instrucao = `
    INSERT INTO empresa (nome, email, cnpj, telefone, responsavel, cep, Matriz) VALUES ('${nome}','${email}', '${cnpj}','${telefone}','${responsavel}', '${cep}', '${idEmpresa}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateUsuario() {
    console.log('chegou aqui na empresa')
   

    var instrucao = `
    UPDATE usuario SET fkEmpresa = (select max(idempresa) from empresa)
    WHERE id_usuario= (select max_id from (select max(id_usuario) as max_id from usuario) as b);
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
 /*function trigger(){
    var instrucao = `DELIMITER $

    CREATE TRIGGER update_usuario
    AFTER INSERT ON Empresa 
    FOR EACH ROW
    BEGIN
     update usuario set fkEmpresa = (select max(id_empresa) from empresa) where id_usuario = last_insert_id() ;
    END$
    DELIMITER ;`
    return database.executar(instrucao); 
}*/

function listarDadosUsuario(idUsuario) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosUsuario()");
    var instrucao = `
        SELECT * FROM usuario 
            WHERE id_usuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosEmpresa(idEmpresa) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosUsuario()");
    var instrucao = `
        SELECT * FROM Empresa 
            WHERE idEmpresa = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarEmpresas(idEmpresa) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosUsuario()");
    var instrucao = `
        SELECT Empresa.idempresa, Empresa.nome FROM Empresa 
            WHERE Matriz = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarParametroCpu(significativo,moderadoCpu,criticoCpu) {
    console.log('chegou aqui na empresa')
   

    var instrucao = `
    UPDATE parametros SET significativo = ${significativo} where idparametro = from empresa)
    WHERE id_usuario= (select max_id from (select max(id_usuario) as max_id from usuario) as b);
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

async function updateEmail(email, idUsuario) {
    console.log("ACESSEI O Usuario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ")

    var instrucao = `UPDATE usuario SET usuario.email = '${email}'
    WHERE id_usuario = ${idUsuario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return await database.executar(instrucao);
}

async function updateSenha(senha, idUsuario) {
    console.log("ACESSEI O Usuario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ")

    var instrucao = `UPDATE usuario SET senha = '${senha}'
    WHERE id_usuario = ${idUsuario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return await database.executar(instrucao);
}

async function updateCep(cep, idEmpresa) {
    console.log("ACESSEI O Usuario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ")

    var instrucao = `UPDATE Empresa SET cep = '${cep}'
    WHERE idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return await database.executar(instrucao);
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    updateUsuario,
    empresa,
    listarDadosUsuario,
    listarDadosEmpresa,
    atualizarParametroCpu,
    updateEmail,
    updateSenha,
    updateCep,
    filial,
    cadastroMaquina,
    listarEmpresas
};