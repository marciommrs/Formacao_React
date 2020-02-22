class Negociacao {

  constructor(_data, _quantidade, _valor) {
    
    // constructor(data, quantidade, valor) {
    // this._data = new Data(data.getTime());
    // this._quantidade = quantidade;
    // this._valor = valor;

    // Object.assign(this, {
    //   _data: new Date(data.getTime()),
    //   _quantidade: quantidade,
    //   _valor: valor});
      
    Object.assign(this, { _quantidade, _valor }); //Atribuindo os parâmetros às proriedades de classe com o mesmo nome.
    this._data = new Date(_data.getTime());
    Object.freeze(this);
  }

  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  isEquals(outraNegociacao) {        
    return JSON.stringify(this) == JSON.stringify(outraNegociacao)
}
}