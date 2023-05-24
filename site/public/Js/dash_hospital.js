
function getHospital() {
    var cnpj = sessionStorage.CNPJ;
    console.log(cnpj)

    fetch(`/usuarios/listarHospitais/${cnpj}`)
        .then(function (resposta) {
            if (resposta.ok) {

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    console.log(resposta.length)
                    for (let i = 0; i < resposta.length; i++) {
                        hospital.innerHTML += `    
                        <a  href="./dashboard_computadores.html" class="hospital" >
                        <img src="./assets/imagens/hospital.png" onclick="i('${resposta[i].nome}')" >
                        <h2>${resposta[i].nome}</h2>
                        <span>X Alertas</span>
                    </a>`;
                 

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
function i(nome){
    console.log(nome)
     sessionStorage.NOMEHOSPITAL = nome 
}