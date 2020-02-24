import {currentInstance} from './controllers/NegociacaoController';
import {DateHelper} from './helpers/DateHelper';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

//O this do adiciona dentro de adiciona e apaga deve ser mantido, por isso o bind.
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);

document.querySelector('#data').value = DateHelper.dateToText(new Date());
//document.querySelector('#data').value = DateHelper.toDateInputValue(new Date());
//Quando uso do tipo Date no input.