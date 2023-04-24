function cadastroFilial(){
    var nomeFilialVar = nome_input.value;
    var emailFilialVar = email_input.value;
    var telefoneFilialVar = telefone_input.value;
    var responsavelFilialVar = responsavel_input.value;
    var cepFilialVar = cep_input.value;

    // Enviando o valor da nova input
    fetch(`/usuarios/filial/${sessionStorage.ID_EMPRESA}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeFilialServer: nomeFilialVar,
            emailFilialServer: emailFilialVar,
            telefoneFilialServer: telefoneFilialVar,
            ResponsavelFilialServer: responsavelFilialVar,
            cepFilialServer: cepFilialVar,
            cnpjMatrizServer: sessionStorage.CNPJ
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso! Redirecionando para tela de Cadastro Máquina");
            window.location = "./cadastro_maquina.html";

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}