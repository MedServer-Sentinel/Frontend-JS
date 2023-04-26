

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
            cpf.innerHTML = resposta[0].cpf;
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
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/usuarios/listarDadosEmpresa/${idEmpresa}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          alert("Nenhum resultado encontrado.");
        }
        var nomeHospital = document.getElementById('nomeHospital')
        var responsavel = document.getElementById('nomeResponsavel');
        var cnpj = document.getElementById('cnpj');
        var cep = document.getElementById('cep');
        var telefone = document.getElementById('telefone');
        
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
         
            nomeHospital.innerHTML = resposta[0].nome        
            responsavel.innerHTML = resposta[0].responsavel;
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


   function abrirUpdateEmail(){
    containerUpdateEmail.style.display = "flex";
   }

   function fecharUpdateEmail(){
    containerUpdateEmail.style.display = "none";
   }

   function abrirUpdateSenha(){
    containerUpdateSenha.style.display = "flex";
   }

   function fecharUpdateSenha(){
    containerUpdateSenha.style.display = "none";
   }

   function abrirUpdateCEP(){
    containerUpdateCEP.style.display = "flex";
   }

   function fecharUpdateCEP(){
    containerUpdateCEP.style.display = "none";
   }

   function updateEmail(){
    var emailUsuario = document.getElementById('email');

    fetch(`/usuarios/updateEmail`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: inputEmail.value,
        idUsuario: sessionStorage.ID_USUARIO
      })
    }).then(function (resposta) {
      
      if (resposta.ok) {
        window.alert("Email atualizado com sucesso");
        window.location = "./configuracao_user.html";
        
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    emailUsuario.innerHTML = inputEmail.value;
   }

   function updateSenha(){
    var senhaUsuario = document.getElementById('senha');

    fetch(`/usuarios/updateSenha`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senha: inputSenha.value,
        idUsuario: sessionStorage.ID_USUARIO
      })
    }).then(function (resposta) {
      
      if (resposta.ok) {
        window.alert("Senha atualizada com sucesso");
        window.location = "./configuracao_user.html";
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    senhaUsuario.innerHTML = inputSenha.value;
   }

   function updateCEP(){

    var CEPempresa = document.getElementById("cep");

    fetch(`/usuarios/updateCep`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cep: inputCEP.value,
        idEmpresa: sessionStorage.ID_EMPRESA
      })
    }).then(function (resposta) {
      
      if (resposta.ok) {
        window.alert("CEP atualizado com sucesso");
        window.location = "./configuracao_user.html";
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    CEPempresa.innerHTML = inputCEP.value;

   }


   function getQuantidadeFiliais(){
    
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var Matriz = document.getElementById('matriz');
    Matriz.value = idEmpresa;
    fetch(`/usuarios/listarEmpresas/${idEmpresa}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          alert("Nenhum resultado encontrado.");
        }
        var selectFiliais = document.getElementById('MatrizOuFilial')
        
        
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
         
          for(var i = 0; i < resposta.length; i++){

            var option = document.createElement('option'); 

            option.id = `option${i}`;
            option.innerHTML = resposta[i].nome;
            option.value = resposta[i].idempresa;
            selectFiliais.appendChild(option);
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