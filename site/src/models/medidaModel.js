var database = require("../database/config");

function buscarUltimasMedidas(mac, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas}  em_uso,FORMAT(data_hora,'dd-MM-yyyy HH:mm:ss') as momento_grafico from [dbo].[MemoriaRam] join [dbo].[DadosRam] on id_ram = fk_ram join maquina on id_maquina
         = fk_maquina   where cod_MAC = '${mac}'
                    order by id_dados_ram desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCPU(mac, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
       select count(id_processo) from Processo where`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDisco(mac, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas} velocidade_leitura from [dbo].[Disco] join [dbo].[DadosDisco] on id_disco = fk_disco join maquina on id_maquina
        = fk_maquina   where cod_MAC = '${mac}'
                   order by id_dados_disco desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function buscarMedidasEmTempoReal(mac) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 em_uso,FORMAT(data_hora,'dd-MM-yyyy HH:mm:ss') as momento_grafico from [dbo].[MemoriaRam] join [dbo].[DadosRam] on id_ram = fk_ram join maquina on id_maquina
        = fk_maquina   where cod_MAC = '${mac}'
                   order by id_dados_ram desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${mac} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(mac) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 1 velocidade_leitura from [dbo].[Disco] join [dbo].[DadosDisco] on id_disco = fk_disco join maquina on id_maquina
        = fk_maquina   where cod_MAC = '${mac}'
                   order by id_dados_disco desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${mac} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarParemetros(mac) {
    console.log('veio aqui sim')

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Parametro.* from [dbo].[Parametro] join [dbo].[Maquina] on fk_maquina = id_parametro where cod_Mac = '${mac}'`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${mac} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscaralertsTempoRealram(mac, critico) {
    console.log("entrou no real ram")
    
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count( replace(replace(em_uso,'GIB',''),',','.')) as critico from [dbo].[DadosRam] join [dbo].[MemoriaRam] 
        on fk_ram = id_ram join [dbo].[Maquina] on fk_maquina = id_maquina where replace(replace(em_uso,'GIB',''),',','.')
          > 
          ${critico} and cod_Mac = '${mac}';
        `;
    } 

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscaralertsTempoRealDisco(mac, critico) {
    console.log("entrou no real DIsco")
    
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count(try_convert(float,replace(replace(velocidade_leitura,'KIB',''),',','.'))) as critico from [dbo].[DadosDisco] join [dbo].[Disco] 
        on fk_disco = id_disco join [dbo].[Maquina] on fk_maquina = id_maquina where try_convert(float,replace(replace(velocidade_leitura,'KIB',''),',','.')) >
          
          ${critico} and cod_Mac = '${mac}';
        `;
    } 
    

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function  MaxRam(mac, critico){
    console.log("esse e o critico "+ critico)

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select CAST (replace(replace(capacidade_total,'GIB',''),',','.') 
        AS float)*${critico/100} as total from [dbo].[MemoriaRam] join maquina on fk_maquina =id_maquina where cod_Mac = '${mac}';
        `;
    } 
    

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function  MaxDisco(mac, critico){
    console.log("esse e o critico "+ critico)

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `
        select CAST (replace(replace(total,'GIB',''),',','.') 
        AS float)*${critico/100} as total from [dbo].[Disco] join maquina on fk_maquina =id_maquina where cod_Mac = '${mac}'
        `;
    } 

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}








module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasDisco,



    buscarMedidasEmTempoReal,

    buscarMedidasEmTempoRealDisco,

    buscarParemetros,


    buscaralertsTempoRealram,
    buscaralertsTempoRealDisco,
    MaxRam,
    MaxDisco



}
