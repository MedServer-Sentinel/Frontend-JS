function mudarheader() {

    var windowWidth = window.innerWidth;
    var sessao = sessionStorage.ID_USUARIO
    if(sessao != undefined) {

        if(windowWidth >= 769){
    var divButtonPerfil = document.getElementById("div_loginButton");
    var buttonPerfil = document.getElementById("button_perfil");
    var aButton = document.getElementById("aButton")
    var img = document.getElementById("img_login");

    var newButtonPerfil = document.createElement("button");
    var newAButton = document.createElement("a");
    var newImg = document.createElement("img");
    aButton.remove();
    buttonPerfil.remove();
    img.remove();

    newImg.src = "/assets/imagens/svg/perfil.svg"
    newImg.width = "30"
    newAButton.innerHTML = sessionStorage.NOME_USUARIO.toUpperCase();
    newAButton.href = "configuracao_user.html";
    newButtonPerfil.style = "cursor: pointer";

    divButtonPerfil.appendChild(newButtonPerfil);
    newButtonPerfil.appendChild(newAButton);
    divButtonPerfil.appendChild(newImg);

    } 
    else {
    var divButtonPerfil = document.getElementById("div_loginButtonCel");
    var buttonPerfilCel = document.getElementById("button_perfilCel");
    var aButtonCel = document.getElementById("aButtonCel")
    var newButtonPerfilCel = document.createElement("button");
    var newAButtonCel = document.createElement("a");

    buttonPerfilCel.remove();
    aButtonCel.remove();
    
    newAButtonCel.innerHTML = sessionStorage.NOME_USUARIO.toUpperCase();
    newAButtonCel.href = "configuracao_user.html";
    newButtonPerfilCel.style = "cursor: pointer";
    divButtonPerfil.appendChild(newButtonPerfilCel)
    newButtonPerfilCel.appendChild(newAButtonCel)
    


    }

    }
    
    }
 