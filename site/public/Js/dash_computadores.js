function verificaUser() {
    let tipo = sessionStorage.TIPO;
    if (tipo != 'admin') {
        let significativo = document.getElementById('significativo');
        let emergencial = document.getElementById('emergencial');
        let critico = document.getElementById('critico');
        significativo.href = "";
        emergencial.href = "";
        critico.href = "";
    }
}

var id;
var soma = 0;

function analise(mac,id,soma){
    fetch(`medidas/parametros/${mac}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
         response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          console.log(soma+ "analise")
    

          maxRam(resposta[0].critico,mac,soma);
          maxDisco(resposta[0].critico,mac,soma);
          update(soma,id);
         
          
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados paramtro: ${error.message}`);
      });
  
      
  }
function getComputer() {
    console.log(sessionStorage.NOMEHOSPITAL);
    var nomeEmpresa = sessionStorage.NOMEHOSPITAL;

    fetch(`/usuarios/listarComputadores/${nomeEmpresa}`)
        .then(function (resposta) {

            if (resposta.ok) {


                var computador = document.getElementById('fileira-computador')
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    console.log(resposta.length)
 
                    for (let i = 0; i < resposta.length; i++) {
                      
                        var mac = resposta[i].cod_MAC
                        console.log(mac+ "teste")
                         id = resposta[i].id_maquina
                        analise(mac,id,soma);
                        let tipo = sessionStorage.TIPO;
                        if (tipo != 'admin') {
                            console.log("entrou?")
                            computador.innerHTML += `    
                            <a href="./dashboard_hospitais.html"style="background-color:${resposta[i].nivel_critico} class="not-active"  id="emergencial">
                            <img src="./assets/imagens/computer.png">
                            <h2>${resposta[i].nome}<br>(Emergencia)</h2>
                            <span>X Alertas</span>
                        </a>`

                        } else {
                            computador.innerHTML += `    
            <a href="./dashboard_hospitais.html" style="background-color:${resposta[i].nivel_critico}" class="computador"  id="emergencial">
            <img src="./assets/imagens/computer.png"  onclick="m('${resposta[i].id_maquina}','${resposta[i].cod_MAC}')">
            <h2>${resposta[i].nome}<br>(Emergencia)</h2>
            <span>X Alertas</span>
        </a>`;
                            console.log(resposta[i].id_maquina)
                        }

    
                      
                      

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
function m(id_maquina, mac) {

    console.log(mac)
    console.log(id_maquina)
    sessionStorage.MAC = mac;
    sessionStorage.ID_MAQUINA = id_maquina;
}


function maxRam(criticoParams,mac,soma) {
    
    console.log(criticoParams,mac + "criticooooooooooooo")
    fetch(`/medidas/MaxRam/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {
  
      if (response.ok) {
        response.json().then(function (repostaAlert) {
          console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
          console.log(`Dados atuais dos akerts:`);
          atualizarAlertRam(repostaAlert[0].total,mac,soma )
          
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
        //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
  
      }
    })
  
  }

  function maxDisco(criticoParams, mac, soma) {
    console.log(criticoParams + "discooooooooo");
    fetch(`medidas/MaximoDisco/${mac}/${criticoParams}`, { cache: 'no-store' })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (repostaAlert) {
            console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
            atualizarAlertDisco(repostaAlert[0].total, mac, soma)
              .then(function (somaAtualizada) {
                console.log(somaAtualizada + "alertDisco");
                // Aqui você pode chamar a função update com a soma atualizada, se necessário
                // update(somaAtualizada, id);
              });
          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        }
      });
  }
  

  function atualizarAlertDisco(criticoParams, mac, soma) {
    return new Promise(function (resolve) {
      fetch(`medidas/alertsDisco/${mac}/${criticoParams}`, { cache: 'no-store' })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (repostaAlert) {
              console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
              console.log(`Dados atuais dos alertas:`);
              soma += repostaAlert[0].critico;
              console.log(soma + "alertDisco");
              resolve(soma);
            });
          } else {
            console.error('Nenhum dado encontrado ou erro na API');
            resolve(soma); // Resolve a Promise com o valor atual de soma (0)
          }
        })
        .catch(function (error) {
          console.error(`Erro na obtenção dos dados de alerta: ${error.message}`);
          resolve(soma); // Resolve a Promise com o valor atual de soma (0)
        });
    });
  }
  
  function atualizarAlertRam(criticoParams, mac, soma) {
    return new Promise(function (resolve) {
      fetch(`medidas/alertsRam/${mac}/${criticoParams}`, { cache: 'no-store' })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (repostaAlert) {
              console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
              console.log(`Dados atuais dos alertas:`);
              soma = repostaAlert[0].critico;
              console.log(soma + "alertRam");
              resolve(soma);
            });
          } else {
            console.error('Nenhum dado encontrado ou erro na API');
            resolve(soma); // Resolve a Promise com o valor atual de soma (0)
          }
        })
        .catch(function (error) {
          console.error(`Erro na obtenção dos dados de alerta: ${error.message}`);
          resolve(soma); // Resolve a Promise com o valor atual de soma (0)
        });
    });
  }
  

function update(soma,id){
    console.log('cores')
    console.log(soma)
  fetch(`/usuarios/updateCor`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
             soma:soma,
             mac:id
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
}

 


 





