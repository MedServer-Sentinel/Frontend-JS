

function obterDadosGrafico(mac) {

  var mac = sessionStorage.MAC
    console.log("chegou?")
    //  alterarTitulo(idSensor)

 

    fetch(`/medidas/ultimas/${mac}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            
         
            
    
           
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
             
               

                for(var i = 0; i < resposta.length;i++){    
                resposta[i].em_uso = resposta[i].em_uso.replace("GiB","");
                resposta[i].em_uso = resposta[i].em_uso.replace(",","");
                   resposta[i].em_uso = parseFloat(resposta[i].em_uso*100);
                    console.log(resposta[i].em_uso);
                }
                

                plotarGrafico(resposta, mac);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function plotarGrafico(resposta,mac) {
    console.log('iniciando plotagem do gráfico...');
      // Criando estrutura para plotar gráfico - labels
      let labels = [];
    
       let dados = {
            labels: labels,
            datasets: [
                {
                    label: 'CPU',
                    data: [],
                    borderColor: '#FF5733',
                    backgroundColor: '#FF5733',
                },
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
    

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
      var momento = resposta[i].momento_grafico;
      var valor = resposta[i].em_uso;
      labels.push(momento);
      dados.datasets[1].data.push(valor);
    //   dados.datasets[1].data.push(registro.luminosidade2);
    //   dados.datasets[2].data.push(registro.luminosidade3);
    //   dados.datasets[3].data.push(registro.luminosidade4);
    }


    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
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
  
atualizarGrafico();
    
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



         

            // tirando e colocando valores no gráfico
            dados.labels.shift(); // apagar o primeiro
            dados.labels.push(novoRegistro[0].momento_grafico); //  incluir um novo momento

            dados.datasets[0].data.shift();   //apagar o primeiro de umidade
            dados.datasets[0].data.push(novoRegistro[0].ram); // incluir uma nova medida de umidade

            // dados.datasets[1].data.shift();  //  <!-- apagar o primeiro de temperatura -->
            // dados.datasets[1].data.push(novoRegistro[0].luminosidade2); // <!-- incluir uma nova medida de temperatura -->

            // dados.datasets[2].data.shift();  //  <!-- apagar o primeiro de temperatura -->
            // dados.datasets[2].data.push(novoRegistro[0].luminosidade3); // <!-- incluir uma nova medida de temperatura -->

            // dados.datasets[3].data.shift();  //  <!-- apagar o primeiro de temperatura -->
            // dados.datasets[3].data.push(novoRegistro[0].luminosidade4); // <!-- incluir uma nova medida de temperatura -->

            myChart.update();
          

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 4000);
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(mac, dados, myChart), 4000);
      }
    })

      // .catch(function (error) {
      //   console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      // });

  }



