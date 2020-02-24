export class Mensagem {

  //Edge 13 não suporta parâmetros opcionais do ES6
  constructor(texto) {

    this._texto = texto || '';
  }

  get texto() {
    
    return this._texto;
  } 

  set texto(texto) {

    this._texto = texto;
  } 
}