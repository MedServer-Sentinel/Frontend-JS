function verificaUser(){
    let tipo = sessionStorage.TIPO;
    if(tipo != 'admin'){
        let significativo = Document.getElementById('significativo');
        let emergencial = Document.getElementById('emergencial');
        let critico = Document.getElementById('critico'); 
        significativo.href = "";
        emergencial.href = "";
        critico.href = "";
    }
}