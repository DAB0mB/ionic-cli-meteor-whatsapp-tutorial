'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmationCtrl = function (_Controller) {
  _inherits(ConfirmationCtrl, _Controller);

  function ConfirmationCtrl() {
    _classCallCheck(this, ConfirmationCtrl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmationCtrl).apply(this, arguments));

    _this.phone = _this.$state.params.phone;
    return _this;
  }

  _createClass(ConfirmationCtrl, [{
    key: 'confirm',
    value: function confirm() {
      var _this2 = this;

      if (_.isEmpty(this.code)) return;

      Accounts.verifyPhone(this.phone, this.code, function (err) {
        if (err) return _this2.handleError(err);
        _this2.$state.go('profile');
      });
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      this.$log.error('Confirmation error ', err);

      this.$ionicPopup.alert({
        title: err.reason || 'Confirmation failed',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }
  }]);

  return ConfirmationCtrl;
}(_entities.Controller);

exports.default = ConfirmationCtrl;


ConfirmationCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$log'];