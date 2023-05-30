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
        select  top 10 try_convert(float,replace(replace(replace(velocidade_leitura,'KIB',''),',','.'),'MiB','')) as velocidade_leitura  from [dbo].[DadosDisco] join [dbo].[Disco] 
                   on fk_disco = id_disco join [dbo].[Maquina] on fk_maquina = id_maquina  where cod_MAC = '${mac}' order by id_dados_disco desc ;`;

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
function buscarBarraRam(mac) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 7 max(em_uso) as em_uso, day(r.data_hora) as dia from [dbo].[DadosRam] as r join [dbo].[MemoriaRam] on fk_ram = id_ram join [dbo].[Maquina] on fk_maquina = id_maquina  join disco as d on d.fk_maquina = id_maquina  join [dbo].[DadosDisco] 
        on fk_disco = id_disco  where cod_mac = '${mac}' group by day(r.data_hora) order by day(r.data_hora) desc;
        `;

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
function buscarBarraDisco(mac) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 7 max(try_convert(float,replace(replace(replace(tempo_escrita,'KIB',''),',','.'),'MiB','')))*0.02 as escrita from 
        [dbo].[DadosRam] as r 
        join [dbo].[MemoriaRam] on fk_ram = id_ram join [dbo].[Maquina] on fk_maquina = id_maquina  
        join disco as d on d.fk_maquina = id_maquina  join [dbo].[DadosDisco] 
        on fk_disco = id_disco   where cod_mac = '${mac}' group by day([dbo].[DadosDisco].data_hora);
        `;

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
function buscarBarraRam2(mac) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT top 7 max(em_uso) as em_uso, FORMAT(data_hora,'HH') as hora from [dbo].[DadosRam] as r 
        join [dbo].[MemoriaRam] on fk_ram = id_ram join [dbo].[Maquina] on fk_maquina = 
        id_maquina where cod_mac = '${mac}' group by FORMAT(data_hora,'HH'); 
        `;

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
function buscarBarraDisco2(mac) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 7 max(try_convert(float,replace(replace(replace(tempo_escrita,'KIB',''),',','.'),'MiB','')))*0.02 as escrita from  [dbo].[Maquina]  join disco as d on d.fk_maquina = id_maquina  join [dbo].[DadosDisco] 
 on fk_disco = id_disco  where cod_mac = '${mac}' group by FORMAT(data_hora,'HH'); 
 

        `;

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
        select  top 1 try_convert(float,replace(replace(replace(velocidade_leitura,'KIB',''),',','.'),'MiB','')) as velocidade_leitura  from [dbo].[DadosDisco] join [dbo].[Disco] 
        on fk_disco = id_disco join [dbo].[Maquina] on fk_maquina = id_maquina  where cod_MAC = '${mac}' order by id_dados_disco desc ;`;

                   

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
  
    
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count(try_convert(float, replace(replace(replace(em_uso,'GIB',''),',','.'),'Mib',''))) as critico from [dbo].[DadosRam] join [dbo].[MemoriaRam]
        on fk_ram = id_ram join [dbo].[Maquina] on fk_maquina = id_maquina where try_convert(float,replace(replace(replace(em_uso,'KIB',''),',','.'),'Mib',''))
          
          > 
          ${critico} and cod_Mac = '${mac}';
        `;
    } 

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscaralertsTempoRealDisco(mac, critico) {
  
    
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count(try_convert(float,replace(replace(replace(velocidade_leitura,'KIB',''),',','.'),'Mib',''))) as critico from [dbo].[DadosDisco] join [dbo].[Disco] 
        on fk_disco = id_disco join [dbo].[Maquina] on fk_maquina = id_maquina where try_convert(float,replace(replace(replace(velocidade_leitura,'KIB',''),',','.'),'Mib',''))  > 
	 ${critico*2.5} and cod_Mac = '${mac}';
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
        select CAST (replace(replace(replace(capacidade_total,'GIB',''),',','.'),'MIB','') 
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
            select CAST (replace(replace(replace(total,'GIB',''),',','.'),'MIB','')
            AS float) * ${critico/100} as total from [dbo].[Disco] join maquina on fk_maquina =id_maquina where cod_Mac = '${mac}';
        `;
    } 

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}








module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasDisco,
    buscarBarraRam,
    buscarBarraRam2,
    buscarBarraDisco,
    buscarBarraDisco2,



    buscarMedidasEmTempoReal,

    buscarMedidasEmTempoRealDisco,

    buscarParemetros,


    buscaralertsTempoRealram,
    buscaralertsTempoRealDisco,
    MaxRam,
    MaxDisco



}
