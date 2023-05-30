
sessionStorage.MAC;
sessionStorage.ID_MAQUINA;
function computador() {
  console.log(sessionStorage.NOMEHOSPITAL);
  var nomeEmpresa = sessionStorage.NOMEHOSPITAL;
  fetch(`/usuarios/selectComputadores/${nomeEmpresa}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          console.log(resposta.length)
          for (let i = 0; i < resposta.length; i++) {
            var soma = 0
            var mac = resposta[i].cod_MAC
            console.log(mac + "teste")
           var id = resposta[i].id_maquina
            analise(mac, id,soma);
            console.log("soma  antes for = " + soma)
            soma = 0
            console.log("soma for = " + soma)
          }
            
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });

}

function analise(mac, id,soma) {
  fetch(`medidas/parametros/${mac}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        console.log(soma + "analise")

        maxRam(resposta[0].critico, mac,id,soma);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados paramtro: ${error.message}`);
    });


}

function getComputer(soma) {
  console.log(sessionStorage.NOMEHOSPITAL);
  var nomeEmpresa = sessionStorage.NOMEHOSPITAL;
  computador.innerHTML+= "Ver todos:  <input id='check' type='checkbox' name='' id=''>"

  fetch(`/usuarios/listarComputadores/${nomeEmpresa}`)
    .then(function (resposta) {

      if (resposta.ok) {
   
        var computador = document.getElementById('fileira-computador')
        computador.innerHTML = ''
        resposta.json().then(function (resposta2) {
          console.log("Dados recebidos: ", JSON.stringify(resposta2));
          console.log(resposta2.length)

          for (let i = 0; i < resposta2.length; i++) {
            var mac = resposta2[i].cod_MAC
            console.log(mac + "teste")
            id = resposta2[i].id_maquina
            let tipo = sessionStorage.TIPO;
            if(resposta2[i].nivel_critico != 'green'){

            if (tipo != 'admin') {
              console.log("entrou?")
              computador.innerHTML += `    
                          <a href="./dashboard_hospitais.html"style="background-color:${resposta2[i].nivel_critico} class="not-active"  id="emergencial">
                          <img src="./assets/imagens/computer.png">
                          <h2>${resposta2[i].nome}<br>(Emergencia)</h2>
                          
                      </a>`

            } else {
              computador.innerHTML += `    
          <a href="./dashboard_hospitais.html" style="background-color:${resposta2[i].nivel_critico}" class="computador"  id="emergencial">
          <img src="./assets/imagens/computer.png"  onclick="m('${resposta2[i].id_maquina}','${resposta2[i].cod_MAC}','${resposta2[i].nome}')">
          <h2>${resposta2[i].nome}<br>(Emergencia)</h2>
       
      </a>`;
              console.log(resposta2[i].id_maquina)
            }}
          
            soma = 0




          
          }


        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });


}

function m(id_maquina, mac,nome) {

  console.log(mac)
  console.log(id_maquina)
  sessionStorage.NOME_MAQUINA = nome
  sessionStorage.MAC = mac;
  sessionStorage.ID_MAQUINA = id_maquina;
}


function maxRam(criticoParams, mac,id,soma) {


  console.log(criticoParams, mac + "criticooooooooooooo max ram")
  fetch(`/medidas/MaxRam/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        console.log(`Dados atuais dos akerts:`);
        atualizarAlertRam(repostaAlert[0].total,criticoParams, mac,id,soma)

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

    }
  })

}

function maxDisco(criticoParams, mac,id,soma) {

  console.log(criticoParams + "discooooooooo")
  fetch(`medidas/MaximoDisco/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        atualizarAlertDisco(repostaAlert[0].total, mac,id,soma)
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

    }
  })

}

function atualizarAlertDisco(criticoParams, mac,id,soma) {


  console.log(criticoParams + "criticooooooooooooo disco")
  fetch(`/medidas/alertsDisco/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        console.log(`Dados atuais dos alerts:`);
      soma +=repostaAlert[0].critico
       
        update(soma,id)
        console.log(soma + "alertDisco")
     
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar


    }
  })

}
function atualizarAlertRam(criticoParams,critico, mac,id,soma) {
  console.log(criticoParams + "criticooooooooooooo")
  fetch(`medidas/alertsRam/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        console.log(`Dados atuais dos akerts:`);

        soma += repostaAlert[0].critico//0
        console.log(soma + "alertRam")
        maxDisco(critico, mac,id,soma);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

    }
  })

}

function update(soma, id) {
  console.log('cores')
  console.log(soma)
  fetch(`/usuarios/updateCor`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      soma: soma,
      mac: id
    })
  }).then(function (resposta) {

    if (resposta.ok) {
      console.log(resposta)
      console.log('chegou no update')

    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
  getComputer(soma);
}
