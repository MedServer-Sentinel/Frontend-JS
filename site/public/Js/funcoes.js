

function perfil() {
  backgroundBlack.style.display = "flex"
  telaCadastro.style.display = "none"
}

function sairX() {
  backgroundBlack.style.display = "none"
  telaCadastro.style.display = "none"
  telaEmpresa.style.display = "none"
  telaLogin.style.display = "none"
}

function cadastreSe() {
  telaCadastro.style.display = "flex"
  telaLogin.style.display = "none";
}

function voltarLogin()  {
  telaCadastro.style.display = "None" 
  telaLogin.style.display = "flex"
  telaEmpresa.style.display = "flex"
}

function voltarEmpresa(){
  telaCadastro.style.display = "None"
  telaEmpresa.style.display = "flex"
  telaLogin.style.display = "none"
}

function CadastrarUser(){
  telaCadastro.style.display = "None"
  telaLogin.style.display = "flex"
}

function cadastrarEmpresa()  {
  telaCadastro.style.display = "None"
  telaLogin.style.display = "none"
  telaEmpresa.style.display = "none"
}

 function CadastroFeito(){
  telaEmpresa.style.display = "flex"
  telaLogin.style.display = "none"
  telaCadastro.style.display = "none"
  alert("feito")
}

function abrirMenu() {
  let menuMobile = document.querySelector('.mobile-menu');
  let nav = document.querySelector('.nav-bar')
  if(menuMobile.classList.contains('open')){
    menuMobile.classList.remove('open');
    nav.classList.remove('colorNav')
  } else {
    menuMobile.classList.add('open');
    nav.classList.add('colorNav');
  }
}



