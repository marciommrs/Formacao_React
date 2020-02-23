'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {

  var stores = ['negociacoes'];
  var version = 1;
  var dbName = 'aluraframe';

  var connection = null;
  var close = null;

  return function () {
    function ConnectionFactory() {
      _classCallCheck(this, ConnectionFactory);

      throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    _createClass(ConnectionFactory, null, [{
      key: 'getConnection',
      value: function getConnection() {
        return new Promise(function (resolve, reject) {

          var openRequest = window.indexedDB.open(dbName, version);

          openRequest.onupgradeneeded = function (e) {
            ConnectionFactory._createStore(e.target.result);
          };

          openRequest.onsuccess = function (e) {
            if (!connection) {
              connection = e.target.result;
              close = connection.close.bind(connection);
              connection.close = function () {
                throw new Error('Não é possível fechar diretamente a conexão');
              };
            }
            resolve(connection);
          };

          openRequest.onerror = function (e) {
            console.log(e.target.error);
            reject(e.target.error.name);
          };
        });
      }

      //Varre os objectStore exclui os existentes e cria novos.

    }, {
      key: '_createStore',
      value: function _createStore(connection) {
        stores.forEach(function (store) {
          if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
          connection.createObjectStore(store, { autoIncrement: true });
        });
      }
    }, {
      key: 'closeConnection',
      value: function closeConnection() {
        if (connection) {
          close();
          connection = null;
        }
      }
    }]);

    return ConnectionFactory;
  }();
}();