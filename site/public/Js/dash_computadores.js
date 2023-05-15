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
function getComputer() {
    var nomeEmpresa = sessionStorage.NOMEHOSPITAL;

    fetch(`/usuarios/listarComputadores/${nomeEmpresa}`)
        .then(function (resposta) {
            if (resposta.ok) {

                var computador = document.getElementById('fileira-computador')
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    console.log(resposta.length)
                    for (let i = 0; i < resposta.length; i++) {
                        let tipo = sessionStorage.TIPO;
                        if (tipo != 'admin') {
                            console.log("entrou?")
                            computador.innerHTML += `    
                            <a href="./dashboard_hospitais.html" class="not-active"  id="emergencial">
                            <img src="./assets/imagens/computer.png">
                            <h2>${resposta[i].nome}<br>(Emergencia)</h2>
                            <span>X Alertas</span>
                        </a>`

                        } else {
                            computador.innerHTML += `    
            <a href="./dashboard_hospitais.html" class="computador"  id="emergencial">
            <img src="./assets/imagens/computer.png">
            <h2>${resposta[i].nome}<br>(Emergencia)</h2>
            <span>X Alertas</span>
        </a>`;
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