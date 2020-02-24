
/*Como só será acessível o que for exportado, não há
necessidade de utilizar o padrão de projeto Module Pattern.*/

const stores = ['negociacoes'];
const version = 1;
const dbName = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory {

  constructor() {
    throw new Error('Não é possível criar instâncias de ConnectionFactory');
  }

  static getConnection() {
    return new Promise((resolve, reject) => {

      let openRequest = window.indexedDB.open(dbName, version);

      openRequest.onupgradeneeded = e => {
        ConnectionFactory._createStore(e.target.result);
      };

      openRequest.onsuccess = e => {
        if (!connection) {
          connection = e.target.result;
          close = connection.close.bind(connection);
          connection.close = function () {
            throw new Error('Não é possível fechar diretamente a conexão');
          }
        }
        resolve(connection);
      };

      openRequest.onerror = e => {
        console.log(e.target.error);
        reject(e.target.error.name);
      };
    })
  }

  //Varre os objectStore exclui os existentes e cria novos.
  static _createStore(connection) {
    stores.forEach(store => {
      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store);
      connection.createObjectStore(store, { autoIncrement: true });
    });
  }

  static closeConnection() {
    if (connection) {
      close();
      connection = null;
    }
  }
}