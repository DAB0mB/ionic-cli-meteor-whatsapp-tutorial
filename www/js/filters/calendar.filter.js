'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var calendar = function (_Filter) {
  _inherits(calendar, _Filter);

  function calendar() {
    _classCallCheck(this, calendar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(calendar).apply(this, arguments));
  }

  _createClass(calendar, [{
    key: 'filter',
    value: function filter(time) {
      if (!time) return;

      return moment(time).calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: 'LT',
        lastWeek: 'dddd',
        sameElse: 'DD/MM/YY'
      });
    }
  }]);

  return calendar;
}(_entities.Filter);

exports.default = calendar;