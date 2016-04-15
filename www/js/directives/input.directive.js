'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var input = function (_Directive) {
  _inherits(input, _Directive);

  function input() {
    _classCallCheck(this, input);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(input).apply(this, arguments));

    _this.restrict = 'E';

    _this.scope = {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    };
    return _this;
  }

  _createClass(input, [{
    key: 'link',
    value: function link(scope, element) {
      var _this2 = this;

      element.bind('focus', function (e) {
        if (!scope.onFocus) return;

        _this2.$timeout(function () {
          scope.onFocus();
        });
      });

      element.bind('blur', function (e) {
        if (!scope.onBlur) return;

        _this2.$timeout(function () {
          scope.onBlur();
        });
      });

      element.bind('keydown', function (e) {
        if (e.which != 13) return;

        if (scope.returnClose) {
          element[0].blur();
        }

        if (scope.onReturn) {
          _this2.$timeout(function () {
            scope.onReturn();
          });
        }
      });
    }
  }]);

  return input;
}(_entities.Directive);

exports.default = input;


input.$inject = ['$timeout'];