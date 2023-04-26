function verificaUser(){
    let tipo = sessionStorage.TIPO;
    if(tipo != 'admin'){
        let significativo = document.getElementById('significativo');
        let emergencial = document.getElementById('emergencial');
        let critico = document.getElementById('critico'); 
        significativo.href = "";
        emergencial.href = "";
        critico.href = "";
    }
}