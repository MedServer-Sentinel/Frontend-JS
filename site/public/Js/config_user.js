

function getDadosUsuario() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/listarDadosUsuario/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          alert("Nenhum resultado encontrado.");
        }
        var email = document.getElementById('email')
        var cpf = document.getElementById('cpf');
        var senha = document.getElementById('senha');
        
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
         
            email.innerHTML = resposta[0].email;        
            cpf.innerHTML = resposta[0].Cpf;
            senha.innerHTML = resposta[0].senha
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
   }


   function getDadosEmpresaUsuario(){
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/listarDadosUsuario/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          alert("Nenhum resultado encontrado.");
        }
        var nomeHospital = document.getElementById('nomeHospital')
        var responsavel = document.getElementById('nomeResponsavel');
        var cnpj = document.getElementById('cnpj');
        var cep = document.getElementById('email');
        var telefone = document.getElementById('telefone');
        
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
         
            nomeHospital.innerHTML = resposta[0].nome        
            responsavel.innerHTML = resposta[0].Responsavel;
            cnpj.innerHTML = resposta[0].cnpj
            cep.innerHTML = resposta[0].cep;
            telefone.innerHTML = resposta[0].telefone;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
   }