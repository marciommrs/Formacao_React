class DateHelper {

  constructor() {
    throw new Error('DateHelper não pode ser instanciada.');
  }
  
  static textToDate(text) {
    DateHelper.validateDataFormat(text);
    return new Date(...text.split('/').reverse().map((item, indice) => item - indice % 2));
  }
  
  static validateDataFormat(text) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text))
      throw new Error('Deve estar no formato dd/mm/aaaa');
  }

  static dateToText(data) {
    return `${data.getDate()}/${DateHelper.leftPad(data.getMonth()+1, 2, 0)}/${data.getFullYear()}`;
  }

  static toDateInputValue(data) {
    return data.toJSON().slice(0,10);
  }

  static leftPad(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
  };
}