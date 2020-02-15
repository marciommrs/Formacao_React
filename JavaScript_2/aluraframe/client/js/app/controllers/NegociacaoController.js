class NegociacaoController {

  constructor() {
    
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes(
      model => this._negociacoesView.update(model));

    this._negociacoesView = new NegociacoesView($('#tabelaNegociacoes'));
    this._negociacoesView.update(this._listaNegociacoes);
    
    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemAlerta'));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    
    event.preventDefault();
    
    this._listaNegociacoes.adiciona(this._criaNegociacao());

    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._mensagemView.update(this._mensagem);

    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.apagar();

    this._mensagem.texto = 'Negociações apagadas com sucesso';
    this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao() {

    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value);
  }

  _limpaFormulario() {

    this._inputData.value = DateHelper.toDateInputValue(new Date());
    this._inputQuantidade.value = '1';
    this._inputValor.value = '0.0';

    this._inputData.focus();
  }

}