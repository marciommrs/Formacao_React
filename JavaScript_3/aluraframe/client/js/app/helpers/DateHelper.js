'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
  function DateHelper() {
    _classCallCheck(this, DateHelper);

    throw new Error('DateHelper não pode ser instanciada.');
  }

  _createClass(DateHelper, null, [{
    key: 'textToDate',
    value: function textToDate(text) {
      DateHelper.validateDataFormat(text);
      return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(text.split('/').reverse().map(function (item, indice) {
        return item - indice % 2;
      })))))();
    }
  }, {
    key: 'validateDataFormat',
    value: function validateDataFormat(text) {
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) throw new Error('Deve estar no formato dd/mm/aaaa');
    }
  }, {
    key: 'dateToText',
    value: function dateToText(data) {
      return data.getDate() + '/' + DateHelper.leftPad(data.getMonth() + 1, 2, 0) + '/' + data.getFullYear();
    }
  }, {
    key: 'toDateInputValue',
    value: function toDateInputValue(data) {
      return data.toJSON().slice(0, 10);
    }
  }, {
    key: 'leftPad',
    value: function leftPad(value, totalWidth, paddingChar) {
      var length = totalWidth - value.toString().length + 1;
      return Array(length).join(paddingChar || '0') + value;
    }
  }]);

  return DateHelper;
}();