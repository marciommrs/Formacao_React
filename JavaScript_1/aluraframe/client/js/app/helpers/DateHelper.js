class DateHelper {

  constructor() {
    throw new Error('DateHelper não pode ser instanciada.');
  }
  
  static textToDate(text) {
    DateHelper.validateDataFormat(text);
    return new Date(...text.split('-').map((item, indice) => item - indice % 2));
  }
  
  static validateDataFormat(text) {
    if (!/\d{4}-\d{2}-\d{2}/.test(text))
      throw new Error('Deve estar no formato aaaa-mm-dd');
  }

  static dateToText(data) {
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }

  static toDateInputValue(data) {
    return data.toJSON().slice(0,10);
  }
}