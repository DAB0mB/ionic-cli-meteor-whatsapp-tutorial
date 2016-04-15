'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginCtrl = function (_Controller) {
  _inherits(LoginCtrl, _Controller);

  function LoginCtrl() {
    _classCallCheck(this, LoginCtrl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LoginCtrl).apply(this, arguments));
  }

  _createClass(LoginCtrl, [{
    key: 'login',
    value: function login() {
      var _this2 = this;

      if (_.isEmpty(this.phone)) return;

      var confirmPopup = this.$ionicPopup.confirm({
        title: 'Number confirmation',
        template: '<div>' + this.phone + '</div><div>Is your phone number above correct?</div>',
        cssClass: 'text-center',
        okText: 'Yes',
        okType: 'button-positive button-clear',
        cancelText: 'edit',
        cancelType: 'button-dark button-clear'
      });

      confirmPopup.then(function (res) {
        if (!res) return;

        _this2.$ionicLoading.show({
          template: 'Sending verification code...'
        });

        Accounts.requestPhoneVerification(_this2.phone, function (err) {
          _this2.$ionicLoading.hide();
          if (err) return _this2.handleError(err);
          _this2.$state.go('confirmation', { phone: _this2.phone });
        });
      });
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      this.$log.error('Login error ', err);

      this.$ionicPopup.alert({
        title: err.reason || 'Login failed',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }
  }]);

  return LoginCtrl;
}(_entities.Controller);

exports.default = LoginCtrl;


LoginCtrl.$inject = ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$log'];