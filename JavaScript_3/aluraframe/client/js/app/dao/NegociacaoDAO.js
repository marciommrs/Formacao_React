class NegociacaoDAO {

  constructor(connection) {

    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {

    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao);

      request.onsuccess = e => {
        resolve('');
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível adicionar a negociação');
      }
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      let negociacoes = [];
      let cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

        cursor.onsuccess = e => {
          let atual = e.target.result;
          if (atual) {
            let dado = atual.value;
            negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
            atual.continue(); // Chama novamente o onsuccess.
          } else {
            resolve(negociacoes)
          }
        };
        
        cursor.onerror = e => {
          console.log(e.target.error);
          reject('Não foi possível recuperar as negociação do banco');
        };
    });
  }


  removeTodos() {

    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .remove(negociacao);

      request.onsuccess = e => {
        resolve('');
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível adicionar a negociação');
      }
    });
  }

}