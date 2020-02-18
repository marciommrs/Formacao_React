class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#tabelaNegociacoes')),
      'adiciona', 'esvazia');

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemAlerta')),
      'texto');
  }

  adiciona(event) {

    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }

  importaNegociacoes() {

    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(), 
      service.obterNegociacoesDaSemanaAnterior(), 
      service.obterNegociacoesDaSemanaRetrasada()]
    ).then(negociacoes => {
          console.log(negociacoes); //3 arrays de negociação.
          negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), []) // reduz para 1 array.
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociacões importadas com sucesso';
    })
    .catch(erro => this._mensagem.texto = erro);

    /*let promise = service.obterNegociacoesDaSemana();
      promise.then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana obtida com sucesso.'
      })
      .catch(erro => this._mensagem.texto = erro);*/
    
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