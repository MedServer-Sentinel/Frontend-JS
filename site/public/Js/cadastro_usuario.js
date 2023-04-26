function CadastrarUsuario() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var cpfVar = cpf_input.value;
    var tipoVar = tipo_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmarSenha_input.value;
    

    if (nomeVar == "" || emailVar == "" || cpfVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {

        console.log("Mensagem de erro para todos os campos em branco");
        return false;
    }


    // Enviando o valor da nova input
    fetch(`/usuarios/cadastrarUsuario/${sessionStorage.ID_EMPRESA}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            cpfServer: cpfVar,
            tipoServer: tipoVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            alert("Cadastro realizado com sucesso! Redirecionando para tela de Configuração do ADMIN");
            window.location = "./configuracao_user.html"

            setTimeout(() => {
                console.log("redirecione para a tela de cadastro empresa");
            }, "2000")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}