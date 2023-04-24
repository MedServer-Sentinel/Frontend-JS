function cadastroMaquina(){
    var nomeMaquinaVar = nome_input.value;
    var ipv4Var = ipv4_input.value;
    var macVar = mac_input.value;
    var MatrizOuFilialVar = MatrizOuFilial.value;
    var tipoVar = tipo_input.value;
    var andarVar = andar_input.value;
    var setorVar = setor_input.value;

    // Enviando o valor da nova input
    fetch("/usuarios/cadastroMaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeMaquinaServer: nomeMaquinaVar,
            ipv4Server: ipv4Var,
            macServer: macVar,
            MatrizOuFilialServer: MatrizOuFilialVar,
            tipoServer: tipoVar,
            andarServer: andarVar,
            setorServer: setorVar
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