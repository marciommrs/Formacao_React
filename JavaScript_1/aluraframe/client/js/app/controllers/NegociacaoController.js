class NegociacaoController {

  constructor() {
    
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

  }

  adiciona(event) {
    
    event.preventDefault();

    console.log(DateHelper.textToDate(this._inputData.value));

    let negociacao = new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
    console.log(negociacao);

    console.log(DateHelper.dateToText(negociacao._data));
    
  }

}