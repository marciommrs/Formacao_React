'use strict';

//Incluindo função include no Array para funcionar no Microsot Edge
if (!Array.prototype.includes) {

  // Se não existir, adiciona

  console.log('Polyfill para Array.includes aplicado.');

  Array.prototype.includes = function (elemento) {
    return this.indexOf(elemento) != -1;
  };
}