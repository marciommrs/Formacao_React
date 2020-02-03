class NegociacaoController {

  adiciona(event) {    
    event.preventDefault();

<<<<<<< Updated upstream
    let inputData = document.querySelector('#data');
    let inputQuantidade = document.querySelector('#quantidade');
    let inputValor = document.querySelector('#valor');
=======
    let $ = document.querySelector.bind(documento);

    let inputData = $('#data');
    let inputQuantidade = $('#quantidade');
    let inputValor = $('#valor');
>>>>>>> Stashed changes

    console.log(inputData.value);
    console.log(inputQuantidade.value);
    console.log(inputValor.value);
  }
}