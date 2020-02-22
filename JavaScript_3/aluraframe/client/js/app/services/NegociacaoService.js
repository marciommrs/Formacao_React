class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
      return Promise.all([
          this.obterNegociacoesDaSemana(), 
          this.obterNegociacoesDaSemanaAnterior(), 
          this.obterNegociacoesDaSemanaRetrasada()]
        ).then(periodos => {
              let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
              return negociacoes;
        })
        .catch(erro => {
          throw new Error(erro);
        });

  }

  obterNegociacoesDaSemana() {
    
    return this._http.get('negociacoes/semana')
        .then(negociacoes => {
          return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        })
        .catch(erro => {
          console.log(erro);
          throw new Error('Não foi possível obter as negociações da semana');
        });
  }

  obterNegociacoesDaSemanaRetrasada() {
    
    return this._http.get('negociacoes/retrasada')
        .then(negociacoes => {
          return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        })
        .catch(erro => {
          console.log(erro);
          throw new Error('Não foi possível obter as negociações da semana retrasada');
        });
  }

  obterNegociacoesDaSemanaAnterior() {

    return this._http.get('negociacoes/anterior')
        .then(negociacoes => {
          return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        })
        .catch(erro => {
          console.log(erro);
          throw new Error('Não foi possível obter as negociações da semana anterior');
        });
  }

  cadastra(negociacao) {
    return new Promise((resolve, reject) => {

      ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDAO(connection))
        .then(dao => dao.adiciona(negociacao))
        .then(() => resolve('Negociação adicionada com sucesso'))
        .catch(erro => reject(erro))
    });
  }

  lista() {
    return new Promise((resolve, reject) => {
      ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.listaTodos())
      .then(negociacoes => resolve(negociacoes))
      .catch(erro => reject(erro))
    });
  }

  apaga() {
    return new Promise((resolve, reject) => {
      ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDAO(connection))
      .then(dao => dao.apagaTodos())
      .then(mensagem => resolve(mensagem))
      .catch(erro => reject(erro));
    });
  }

}