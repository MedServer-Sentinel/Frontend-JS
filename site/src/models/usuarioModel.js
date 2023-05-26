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
        INSERT INTO usuario (nome, email, cpf, senha, tipo) VALUES ('${nome}', '${email}', '${cpf}', '${senha}','admin');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarUsuario(nome, email, cpf, tipo, senha, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, tipo, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, cpf, senha, tipo, fkempresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}','${tipo}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastroMaquina(nome,  mac, MatrizOuFilial, tipo, andar, setor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome,  mac, MatrizOuFilial, tipo, andar, setor);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO  Maquina (nome,  Tipo, cod_MAC, andar, setor, fk_empresa) VALUES ('${nome}', '${tipo}', '${mac}','${andar}', '${setor}', '${MatrizOuFilial}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}
function inserirParametro(fkmaquina) {
    console.log('chegou aqui na empresa')
    updateParametro(fkmaquina)

    var instrucao = `
    UPDATE Parametro SET fk_maquina = (select max(id_maquina) from maquina)
    WHERE id_parametro= (select max_id from (select max(id_parametro) as max_id from Parametro) as b);
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateParametro(fkmaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO  parametro (significativo, moderado, critico, fk_maquina,nivel_critico
            ) VALUES ('30', '60', '80','${1}','green');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function parametroRam(significativo, moderado, critico,id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function up():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    moderadoRam(moderado,id);
    criticoRam(critico,id)
    var instrucao = `
    update parametro set  significativo = '${significativo}' where id_parametro = '${id}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function moderadoRam( moderado,id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function up():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    update parametro set  moderado= '${moderado}' where id_parametro = '${id}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function criticoRam( critico,id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function up():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    update parametro set critico = '${critico}' where id_parametro = '${id}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function empresa(nome, cnpj, email, telefone, responsavel, cep) {
    console.log('chegou aqui na empresa')
    console.log(nome, cnpj, email, telefone, responsavel, cep)


    var instrucao = `
    INSERT INTO empresa (nome, cnpj , email, telefone, responsavel, cep) VALUES ('${nome}','${cnpj}', '${email}','${telefone}','${responsavel}', '${cep}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function filial(nome, email, cnpj, telefone, responsavel, cep, idEmpresa) {
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
function listarComputadores(nomeEmpresa) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosUsuario()");
    var instrucao = `
    select  m.nome,cod_MAC,id_maquina, nivel_critico from  empresa join  Maquina as m on m.fk_empresa = idempresa join [dbo].[Parametro] on fk_maquina = id_maquina where empresa.nome = '${nomeEmpresa}';
  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarHospitais(cnpj) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosUsuario()");
    var instrucao = `
    select m.nome from empresa as m where cnpj = '${cnpj}';
   
;
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

function atualizarParametroRam(significativo, moderadoCpu, criticoCpu) {
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
 function updateCor(cor, id) {
    console.log("atualizando cor para +  " + cor)
    var instrucao = `
    update Parametro set nivel_critico = '${cor}' where fk_maquina = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    entrar,
    cadastrar,
    cadastrarUsuario,
    listar,
    updateUsuario,
    empresa,
    listarDadosUsuario,
    listarComputadores,
    listarHospitais,
    listarDadosEmpresa,
    parametroRam,
    updateEmail,
    updateSenha,
    updateCep,
    updateCor,
    filial,
    cadastroMaquina,
    listarEmpresas,
    inserirParametro
};