const { selectComputadores } = require("../controllers/usuarioController");
var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarDias(mac) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select top 7 max(em_uso) as maximo,max(tempo_escrita) as maximoDisco,ROUND(avg(try_convert(float, replace(replace(replace(em_uso,'GIB',''),',','.'),'Mib',''))),2) as media, 
    ROUND(avg(try_convert(float, replace(replace(replace(tempo_escrita,'GIB',''),',','.'),'Mib',''))),2) as mediaDisco,
    day(r.data_hora) as dia from [dbo].[DadosRam] as r join [dbo].[MemoriaRam] on fk_ram = id_ram join
     [dbo].[Maquina] on fk_maquina = id_maquina  join disco as d on d.fk_maquina = id_maquina  join [dbo].[DadosDisco] 
        on fk_disco = id_disco  where cod_mac = '${mac}' group by day(r.data_hora) order by day(r.data_hora);

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function buscarMaior(mac) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT TOP 7 MAX(r.em_uso) AS maximo, DAY(r.data_hora) AS dia
    FROM [dbo].[DadosRam] AS r
    JOIN [dbo].[MemoriaRam] ON r.fk_ram = MemoriaRam.id_ram
    JOIN [dbo].[Maquina] ON Maquina.id_maquina = MemoriaRam.fk_maquina
    JOIN [dbo].[Disco] AS d ON d.fk_maquina = Maquina.id_maquina
    JOIN [dbo].[DadosDisco] ON DadosDisco.fk_disco = d.id_disco
    WHERE Maquina.cod_mac = '${mac}'
    GROUP BY DAY(r.data_hora)
    ORDER BY maximo DESC;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function mediasRam(mac) {
    console.log("acessei moodel com  o mac = " + mac);
    var instrucao = `
    SELECT TOP 7 max(em_uso) as em_uso,ROUND(AVG(TRY_CONVERT(FLOAT, REPLACE(REPLACE(REPLACE(em_uso, 'GIB', ''), ',', '.'), 'Mib', ''))), 2) AS media, 
    CONVERT(VARCHAR(10), data_hora, 120) AS dia
FROM [dbo].[DadosRam]
JOIN [dbo].[MemoriaRam] ON fk_ram = id_ram
JOIN [dbo].[Maquina] ON fk_maquina = id_maquina
WHERE cod_mac = '${mac}'
GROUP BY CONVERT(VARCHAR(10), data_hora, 120)
ORDER BY CONVERT(VARCHAR(10), data_hora, 120);


    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function mediasCPU(mac) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT CONVERT(VARCHAR(10), p.data_hora, 120) AS dia, p.nome, MAX(uso_cpu) AS maximo
    FROM [dbo].[Processo] AS p
    JOIN [dbo].[Processador] ON fk_processador = id_Processador
    JOIN maquina ON fk_maquina = id_maquina where cod_MAC = '${mac}'
    GROUP BY CONVERT(VARCHAR(10), p.data_hora, 120), p.nome
    HAVING MAX(uso_cpu) = (
        SELECT MAX(uso_cpu)
        FROM [dbo].[Processo] AS p2
        WHERE CONVERT(VARCHAR(10), p2.data_hora, 120) = CONVERT(VARCHAR(10), p.data_hora, 120)
    )
    ORDER BY CONVERT(VARCHAR(10), p.data_hora, 120) DESC;
    
    

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function mediasDisco(mac) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `

    SELECT TOP 7 max(TRY_CONVERT(FLOAT, REPLACE(REPLACE(REPLACE(tempo_escrita, 'KIB', ''), ',', '.'), 'Mib', ''))) as escrita
,ROUND(AVG(TRY_CONVERT(FLOAT, REPLACE(REPLACE(REPLACE(tempo_escrita, 'KIB', ''), ',', '.'), 'Mib', ''))), 2) AS media, 
    CONVERT(VARCHAR(10), data_hora, 120) AS dia
FROM [dbo].[DadosDisco]
JOIN [dbo].[Disco] ON fk_disco = id_disco
JOIN [dbo].[Maquina] ON fk_maquina = id_maquina
WHERE cod_mac = '${mac}'
    GROUP BY CONVERT(VARCHAR(10), data_hora, 120)
    ORDER BY CONVERT(VARCHAR(10), data_hora, 120) desc;

    

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

function cadastroMaquina(nome, mac, MatrizOuFilial, tipo, andar, setor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, mac, MatrizOuFilial, tipo, andar, setor);

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
            ) VALUES ('30', '60', '80','${fkmaquina}','green');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function  temporizador(tempo,mac){
    console.log("esse e o tempo "+ tempo)

    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
         update [dbo].[Parametro] set tempo = '${tempo}' where id_Parametro = '${mac}'
        `;
    } 

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}
function parametroRam(significativo, moderado, critico,id,tempo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function up():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    temporizador(tempo,id)
    moderadoRam(moderado, id);
    criticoRam(critico, id)
    var instrucao = `
    update parametro set  significativo = '${significativo}' where fk_maquina = '${id}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function moderadoRam(moderado, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function up():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    update parametro set  moderado= '${moderado}' where fk_maquina = '${id}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function criticoRam(critico, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function up():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    update parametro set critico = '${critico}' where fk_maquina = '${id}'
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
function selectComputadores1(nomeEmpresa) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDadosUsuario()");
    var instrucao = `
    select m.* from  empresa join  Maquina as m on m.fk_empresa = idempresa join [dbo].[Parametro] on fk_maquina = id_maquina where empresa.nome = '${nomeEmpresa}';
  
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
function corRED(nome) {
    console.log()
    var instrucao = `
 
select count(id_parametro) as qnt from [dbo].[Parametro] join [dbo].[Maquina] on fk_maquina = id_maquina join empresa on fk_empresa = idempresa where nivel_critico = 'red' and [dbo].[Empresa].nome = '${nome}';`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function corGreen(nome) {
    console.log()
    var instrucao = `
 
select count(id_parametro) as qnt from [dbo].[Parametro] join [dbo].[Maquina] on fk_maquina = id_maquina join empresa on fk_empresa = idempresa where nivel_critico = 'green' and [dbo].[Empresa].nome = '${nome}';`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function corOrange(nome) {
    console.log()
    var instrucao = `
 
select count(id_parametro) as qnt from [dbo].[Parametro] join [dbo].[Maquina] on fk_maquina = id_maquina join empresa on fk_empresa = idempresa where nivel_critico = 'Orange' and [dbo].[Empresa].nome = '${nome}';`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function corYellow(nome) {
    console.log()
    var instrucao = `
 
select count(id_parametro) as qnt from [dbo].[Parametro] join [dbo].[Maquina] on fk_maquina = id_maquina join empresa on fk_empresa = idempresa where nivel_critico = 'Yellow' and [dbo].[Empresa].nome = '${nome}';`

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
    inserirParametro,
    listarDias,
    buscarMaior,
    mediasRam,
    mediasCPU,
    mediasDisco,
    selectComputadores1,
    corRED,
    corGreen,
    corOrange,
    corYellow,
};