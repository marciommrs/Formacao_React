class DateHelper {

  constructor() {
    throw new Error('DateHelper não pode ser instanciada.');
  }

  static textToDate(text) {
    return new Date(...text.split('-').map((item, indice) => item - indice % 2));
  }

  static dateToText(data) {
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }
}