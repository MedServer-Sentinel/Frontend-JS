function gerarPDF(){
    var dados = document.getElementById('dados').innerHTML;
    var janela = window.open('','','width = 100vw,heigth =100vh');
    janela.document.write('<html><head>');
      janela.document.write('<title>PDF</title></head>');
    janela.document.write('<body>')
    janela.document.write(dados)
    janela.document.write('</body></html>')
    janela.document.cloneNode();
    janela.print()
  }