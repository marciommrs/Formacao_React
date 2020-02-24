import {ProxyFactory} from '../services/ProxyFactory';

export class Bind {

  constructor(model, view, ...props) {

    let proxy = ProxyFactory.create(model, props, model => 
        view.update(model));

    view.update(model); // Renderizando pela primeira vez.
    
    return proxy;
  }
}