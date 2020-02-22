class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._ordemAtual = '';
    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#tabelaNegociacoes')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemAlerta')),
      'texto');
    
      this._init();
    
  }

  _init() {
    this._carregarNegociacoes();
    // setInterval(() => {
    //   this._importaNegociacoes()
    // }, 3000)
  }

  adiciona(event) {
    
    event.preventDefault();

    let negociacao = this._criaNegociacao();
    new NegociacaoService()
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = mensagem; 
        this._limpaFormulario();
      })
      .catch(erro => this._mensagem.texto = erro);

  }

  _carregarNegociacoes() {
    ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.listaTodos())
      .then(negociacoes => 
        negociacoes.map(negociacao => 
          this._listaNegociacoes.adiciona(negociacao)))
      .catch(erro => this._mensagem.texto = erro);
  }

  apaga() {
    ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.apagaTodos())
      .then(mensagem => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = mensagem;
      })
      .catch(erro => this._mensagem.texto = erro);
    
  }

  _importaNegociacoes() {

    let service = new NegociacaoService();

    service.obterNegociacoes()
      .then(negociacoes => 
        negociacoes.filter(negociacao => 
          !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
            JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao))))
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociacões importadas com sucesso';
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }

  _criaNegociacao() {

    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value));
  }

  _limpaFormulario() {

    this._inputData.value = DateHelper.dateToText(new Date());
    this._inputQuantidade.value = '1';
    this._inputValor.value = '0.0';

    this._inputData.focus();
  }

}