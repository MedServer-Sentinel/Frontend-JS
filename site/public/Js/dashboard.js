
var ramMax = 0;
var discoMax = 0;
var criticoram = 0;
function buscarParemetros() {
  var mac = sessionStorage.MAC
  fetch(`medidas/parametros/${mac}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {


       response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        console.log(resposta[0].critico)
     
        maxRam(resposta[0].critico);
        maxDisco(resposta[0].critico)

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados paramtro: ${error.message}`);
    });
}
function atualizarAlertRam(criticoParams) {
  var mac = sessionStorage.MAC;

  console.log(criticoParams + "criticooooooooooooo")
  fetch(`medidas/alertsRam/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        console.log(`Dados atuais dos akerts:`);
        alertRAM.innerHTML = repostaAlert[0].critico;
        proximaAtualizacaoRam = setTimeout(() => atualizarAlertRam(criticoParams), 5000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacaoRam = setTimeout(() => atualizarAlertRam(criticoParams), 10000);
    }
  })
 
}
function maxRam(criticoParams) {
  var mac = sessionStorage.MAC;

  console.log(criticoParams + "criticooooooooooooo")
  fetch(`/medidas/MaxRam/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        console.log(`Dados atuais dos akerts:`);
        atualizarAlertRam(repostaAlert[0].total )
 
       
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

    }
  })

}
function atualizarAlertDisco(criticoParams) {
  var mac = sessionStorage.MAC;

  console.log(criticoParams + "criticooooooooooooo disco")
  fetch(`/medidas/alertsDisco/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        console.log(`Dados atuais dos alerts:`);
        alertDisco.innerHTML = repostaAlert[0].critico;
        proximaAtualizacaoRam = setTimeout(() => atualizarAlertDisco(criticoParams), 5000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacaoRam = setTimeout(() =>atualizarAlertDisco (criticoParams), 10000);
    }
  })
 
}
function maxDisco(criticoParams) {
  var mac = sessionStorage.MAC;

  console.log(criticoParams + "discooooooooo")
  fetch(`medidas/MaximoDisco/${mac}/${criticoParams}`, { cache: 'no-store' }).then(function (response) {

    if (response.ok) {
      response.json().then(function (repostaAlert) {
        console.log(`Dados recebidos do alerta: ${JSON.stringify(repostaAlert)}`);
        atualizarAlertDisco(repostaAlert[0].total)
        
 
       
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

    }
  })

}
function obterDadosGraficoEmBarrahora(mac) {

  var mac = sessionStorage.MAC
  console.log("chegou?")
  //  alterarTitulo(idSensor)



  fetch(`/medidas/hora/Ram/${mac}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {


      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
        for (var i = 0; i < resposta.length; i++) {
          resposta[i].em_uso = resposta[i].em_uso.replace("GiB", "");
          resposta[i].em_uso = resposta[i].em_uso.replace(",", ".");
          resposta[i].em_uso = parseFloat(resposta[i].em_uso);
          console.log(resposta[i].em_uso);
        }
        fetch(`/medidas/hora/disco/${mac}`, { cache: 'no-store' }).then(function (response) {
          if (response.ok) {


            response.json().then(function (respostaDisco) {
              console.log(`Dados recebidos: ${JSON.stringify(respostaDisco)}`);
           
              for (var i = 0; i < respostaDisco.length; i++) {
              
              // respostaDisco[i].velocidade_leitura = respostaDisco[i].velocidade_leitura.replace(",", ".");
              // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("MIB", "");
              // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("kib", "");
                respostaDisco[i].escrita = Number(respostaDisco[i].escrita);
               if(Number(respostaDisco[i].escrita) <= 0){
                respostaDisco[i].escrita = Number(respostaDisco[i].escrita) += 2;
               }
                console.log(respostaDisco[i].escrita);
              }
              plotarGraficoBarra2(resposta, respostaDisco);
            });
          } else {
            console.error('Nenhum dado encontrado ou erro na API');
          }
        })

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico ram: ${error.message}`);
    });
}
function plotarGraficoBarra2(resposta, respostaDisco) {
  console.log('iniciando plotagem do gráfico em barra...');
  
  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  let dados = {
    labels: labels,
    datasets: [
      // {
      //   label: 'CPU',
      //   data: [],
      //   borderColor: '#FF5733',
      //   backgroundColor: '#FF5733',
      // },
      {
        label: 'RAM',
        data: [],
        borderColor: '#33FF6B',
        backgroundColor: '#33FF6B',
      },
      {
        label: 'Disco',
        data: [],
        borderColor: '#339CFF',
        backgroundColor: '#339CFF',
      }
    ]
  }



  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico em barra" e passados para "plotarGraficobraa":')
  console.log(resposta)
  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" em barra passados para "plotarGraficobarra":')
  console.log(respostaDisco)

  

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var momento = resposta[i].hora;
    var valor = resposta[i].em_uso;
    labels.push(momento);
    dados.datasets[0].data.push(valor);
  
  }
  for (i = 0; i < respostaDisco.length; i++) {

    var valorDisco = respostaDisco[i].escrita;
    dados.datasets[1].data.push(valorDisco);
  }



  console.log('----------------------------------------------')
  console.log('O gráfico  em barra será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados RAM:')
  console.log(dados.datasets[0])
  console.log('----------------------------------------------')
  console.log('Dados DISCO:')
  console.log(dados.datasets[1])
  console.log('----------------------------------------------')
  // const grafico1 = document.getElementById('grafico-linha');
 

  // Criando estrutura para plotar gráfico - config


  const config3 = {
    type: 'bar',
    data: dados,
  };


  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById('grafico-dia'),
    config3

  );
  

  

}
function obterDadosGraficoEmBarra(mac) {

  var mac = sessionStorage.MAC
  console.log("chegou?")
  //  alterarTitulo(idSensor)



  fetch(`/medidas/Dias/Ram/${mac}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {


      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
        for (var i = 0; i < resposta.length; i++) {
          resposta[i].em_uso = resposta[i].em_uso.replace("GiB", "");
          resposta[i].em_uso = resposta[i].em_uso.replace(",", ".");
          resposta[i].em_uso = parseFloat(resposta[i].em_uso);
          console.log(resposta[i].em_uso);
        }
        fetch(`/medidas/Dias/disco/${mac}`, { cache: 'no-store' }).then(function (response) {
          if (response.ok) {


            response.json().then(function (respostaDisco) {
              console.log(`Dados recebidos: ${JSON.stringify(respostaDisco)}`);
           
              for (var i = 0; i < respostaDisco.length; i++) {
              
              // respostaDisco[i].velocidade_leitura = respostaDisco[i].velocidade_leitura.replace(",", ".");
              // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("MIB", "");
              // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("kib", "");
                respostaDisco[i].escrita = Number(respostaDisco[i].escrita);
               if(Number(respostaDisco[i].escrita) <= 0){
                respostaDisco[i].escrita = Number(respostaDisco[i].escrita) += 2;
               }
                console.log(respostaDisco[i].escrita);
              }
              plotarGraficoBarra(resposta, respostaDisco);
            });
          } else {
            console.error('Nenhum dado encontrado ou erro na API');
          }
        })

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico ram: ${error.message}`);
    });
}

function plotarGraficoBarra(resposta, respostaDisco) {
  console.log('iniciando plotagem do gráfico em barra...');
  
  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  let dados = {
    labels: labels,
    datasets: [
      // {
      //   label: 'CPU',
      //   data: [],
      //   borderColor: '#FF5733',
      //   backgroundColor: '#FF5733',
      // },
      {
        label: 'RAM',
        data: [],
        borderColor: '#33FF6B',
        backgroundColor: '#33FF6B',
      },
      {
        label: 'Disco',
        data: [],
        borderColor: '#339CFF',
        backgroundColor: '#339CFF',
      }
    ]
  }



  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico em barra" e passados para "plotarGraficobraa":')
  console.log(resposta)
  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" em barra passados para "plotarGraficobarra":')
  console.log(respostaDisco)

  

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var momento = resposta[i].dia;
    var valor = resposta[i].em_uso;
    labels.push(momento);
    dados.datasets[0].data.push(valor);
  
  }
  for (i = 0; i < respostaDisco.length; i++) {

    var valorDisco = respostaDisco[i].escrita;
    dados.datasets[1].data.push(valorDisco);
  }



  console.log('----------------------------------------------')
  console.log('O gráfico  em barra será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados RAM:')
  console.log(dados.datasets[0])
  console.log('----------------------------------------------')
  console.log('Dados DISCO:')
  console.log(dados.datasets[1])
  console.log('----------------------------------------------')
  // const grafico1 = document.getElementById('grafico-linha');


  // Criando estrutura para plotar gráfico - config


  const config2 = {
    type: 'bar',
    data: dados,
  };


  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById('grafico-semana'),
    config2

  );
  

  

}

function obterDadosGrafico(mac) {

  var mac = sessionStorage.MAC
  console.log("chegou?")
  //  alterarTitulo(idSensor)



  fetch(`/medidas/ultimas/${mac}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {


      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
        for (var i = 0; i < resposta.length; i++) {
          resposta[i].em_uso = resposta[i].em_uso.replace("GiB", "");
          resposta[i].em_uso = resposta[i].em_uso.replace(",", ".");
          resposta[i].em_uso = parseFloat(resposta[i].em_uso);
          console.log(resposta[i].em_uso);
        }
        fetch(`/medidas/ultimas/disco/${mac}`, { cache: 'no-store' }).then(function (response) {
          if (response.ok) {


            response.json().then(function (respostaDisco) {
              console.log(`Dados recebidos: ${JSON.stringify(respostaDisco)}`);
              respostaDisco.reverse();
              for (var i = 0; i < respostaDisco.length; i++) {
              
              // respostaDisco[i].velocidade_leitura = respostaDisco[i].velocidade_leitura.replace(",", ".");
              // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("MIB", "");
              // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("kib", "");
                respostaDisco[i].velocidade_leitura = parseFloat(respostaDisco[i].velocidade_leitura);
               
                console.log(respostaDisco[i].velocidade_leitura);
              }
              plotarGrafico(resposta, respostaDisco);
            });
          } else {
            console.error('Nenhum dado encontrado ou erro na API');
          }
        })

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico ram: ${error.message}`);
    });

  // fetch(`/medidas/ultimas/disco/${mac}`, { cache: 'no-store' }).then(function (response) {
  //   if (response.ok) {


  //     response.json().then(function (respostaDisco) {
  //       console.log(`Dados recebidos: ${JSON.stringify(respostaDisco)}`);
  //       respostaDisco.reverse();
  //       for (var i = 0; i < respostaDisco.length; i++) {
  //         respostaDisco[i].velocidade_leitura = respostaDisco[i].velocidade_leitura.replace("KiB", "");
  //         respostaDisco[i].velocidade_leitura = respostaDisco[i].velocidade_leitura.replace(",", "");
  //         respostaDisco[i].velocidade_leitura = parseFloat(respostaDisco[i].velocidade_leitura * 100);
  //         console.log(respostaDisco[i].velocidade_leitura);
  //       }        plotarGrafico(respostaDisco);
  //     });
  //   } else {
  //     console.error('Nenhum dado encontrado ou erro na API');
  //   }
  // })
  //   .catch(function (error) {
  //     console.error(`Erro na obtenção dos dados p/ gráfico ram: ${error.message}`);
  //   });

  // fetch(`/medidas/ultimas/cpu/${mac}`, { cache: 'no-store' }).then(function (response) {
  //   if (response.ok) {

  
}
function plotarGrafico(resposta, respostaDisco) {
  console.log('iniciando plotagem do gráfico...');
  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  let dados = {
    labels: labels,
    datasets: [
      // {
      //   label: 'CPU',
      //   data: [],
      //   borderColor: '#FF5733',
      //   backgroundColor: '#FF5733',
      // },
      {
        label: 'RAM',
        data: [],
        borderColor: '#33FF6B',
        backgroundColor: '#33FF6B',
      },
      {
        label: 'Disco',
        data: [],
        borderColor: '#339CFF',
        backgroundColor: '#339CFF',
      }
    ]
  }



  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)
  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(respostaDisco)



  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var momento = resposta[i].momento_grafico;
    var valor = resposta[i].em_uso;
    labels.push(momento);
    dados.datasets[0].data.push(valor);
    //   dados.datasets[1].data.push(registro.luminosidade2);
    //   dados.datasets[2].data.push(registro.luminosidade3);
    //   dados.datasets[3].data.push(registro.luminosidade4);
  }
  for (i = 0; i < respostaDisco.length; i++) {

    var valorDisco = respostaDisco[i].velocidade_leitura;

    dados.datasets[1].data.push(valorDisco);
    //   dados.datasets[1].data.push(registro.luminosidade2);
    //   dados.datasets[2].data.push(registro.luminosidade3);
    //   dados.datasets[3].data.push(registro.luminosidade4);
  }



  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados RAM:')
  console.log(dados.datasets[0])
  console.log('----------------------------------------------')
  console.log('Dados DISCO:')
  console.log(dados.datasets[1])
  console.log('----------------------------------------------')
  // const grafico1 = document.getElementById('grafico-linha');

  // Criando estrutura para plotar gráfico - config
  const config1 = {
    type: 'line',
    data: dados,
  };


  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById('grafico-linha'),
    config1

  );

  atualizarGrafico(dados, myChart);

}
console.log("veio ate aqui?")

function atualizarGrafico(dados, myChart) {

  var mac = sessionStorage.MAC
  console.log("veio ate aqui?")


  fetch(`/medidas/tempo-real/${mac}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);
        for (var i = 0; i < novoRegistro.length; i++) {
          novoRegistro[i].em_uso = novoRegistro[i].em_uso.replace("GiB", "");
          novoRegistro[i].em_uso = novoRegistro[i].em_uso.replace(",", ".");
          novoRegistro[i].em_uso = parseFloat(novoRegistro[i].em_uso);
          console.log(novoRegistro[i].em_uso);
        }

        if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
          console.log("---------------------------------------------------------------")
          console.log("Como não há dados novos para captura, o gráfico não atualizará.")
          //  document.getElementById("avisoCaptura").innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].momento_grafico)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          console.log("atualizandooooooooooooooooooooo rammmm")
          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(novoRegistro[0].momento_grafico); //  incluir um novo momento
          dados.datasets[0].data.shift();  //  <!-- apagar o primeiro de temperatura -->
          dados.datasets[0].data.push(novoRegistro[0].em_uso); // <!-- incluir uma nova medida de temperatura -->
          ramMax = novoRegistro[0]


          fetch(`/medidas/tempo-real/disco/${mac}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
              response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                //         // tirando e colocando valores no gráfico
                // apagar o primeiro


                for (var i = 0; i < resposta.length; i++) {
              
                  // respostaDisco[i].velocidade_leitura = respostaDisco[i].velocidade_leitura.replace(",", ".");
                  // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("MIB", "");
                  // resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("kib", "");
                    resposta[i].velocidade_leitura = parseFloat(resposta[i].velocidade_leitura);
                    console.log(resposta[i].velocidade_leitura);
                  }

                dados.datasets[1].data.shift();  //  <!-- apagar o primeiro de temperatura -->
                dados.datasets[1].data.push(resposta[0].velocidade_leitura); // <!-- incluir uma nova medida de temperatura -->
                resposta[0];
                myChart.update();
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

              });

            }
          })

        }

        proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 10000);

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(mac, dados, myChart), 2000);

    }
  })


  // fetch(`/medidas/tempo-real/cpu/${mac}`, { cache: 'no-store' }).then(function (response) {
  //   if (response.ok) {
  //     response.json().then(function (novoRegistro) {
  //       console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
  //       console.log(`Dados atuais do gráfico:`);
  //       console.log(dados);

  //       if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
  //         console.log("---------------------------------------------------------------")
  //         console.log("Como não há dados novos para captura, o gráfico não atualizará.")
  //         //  document.getElementById("avisoCaptura").innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
  //         console.log("Horário do novo dado capturado:")
  //         console.log(novoRegistro[0].momento_grafico)
  //         console.log("Horário do último dado capturado:")
  //         console.log(dados.labels[dados.labels.length - 1])
  //         console.log("---------------------------------------------------------------")
  //       } else {
  // //         // tirando e colocando valores no gráfico
  //         dados.labels.shift(); // apagar o primeiro
  //         dados.labels.push(novoRegistro[0].momento_grafico); //  incluir um novo momento



  //         dados.datasets[0].data.shift();  //  <!-- apagar o primeiro de temperatura -->
  //         dados.datasets[0].data.push(novoRegistro[0].em_uso); // <!-- incluir uma nova medida de temperatura -->


  //         myChart.update();
  //       }

  // //       // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
  //       proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
  //     });
  //   } else {
  //     console.error('Nenhum dado encontrado ou erro na API');
  // //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
  //     proximaAtualizacao = setTimeout(() => atualizarGrafico(mac, dados, myChart), 2000);
  //   }
  // })


  // fetch(`/medidas/tempo-real/disco/${mac}`, { cache: 'no-store' }).then(function (response) {
  //   if (response.ok) {
  //     response.json().then(function (resposta) {
  //       console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
  //       console.log(`Dados atuais do gráfico:`);
  //       console.log(dados);

  //         //         // tirando e colocando valores no gráfico
  //          // apagar o primeiro


  //          for (var i = 0; i < resposta.length; i++) {
  //           resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace(",", "");
  //           console.log(resposta[i].velocidade_leitura);
  //           resposta[i].velocidade_leitura = resposta[i].velocidade_leitura.replace("KiB", "");

  //           resposta[i].velocidade_leitura = parseFloat(resposta[i].velocidade_leitura * 100);
  //           console.log(resposta[i].velocidade_leitura);
  //         }

  //         dados.datasets[2].data.shift();  //  <!-- apagar o primeiro de temperatura -->
  //         dados.datasets[2].data.push(resposta[0].velocidade_leitura); // <!-- incluir uma nova medida de temperatura -->

  //         myChart.update();





  //       // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
  //       proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 10000);
  //     });
  //   } else {
  //     console.error('Nenhum dado encontrado ou erro na API');
  //     //     // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
  //     proximaAtualizacao = setTimeout(() => atualizarGrafico(mac, dados, myChart), 2000);
  //   }
  // })


}







