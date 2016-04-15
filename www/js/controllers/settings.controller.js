'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsCtrl = function (_Controller) {
  _inherits(SettingsCtrl, _Controller);

  function SettingsCtrl() {
    _classCallCheck(this, SettingsCtrl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SettingsCtrl).apply(this, arguments));
  }

  _createClass(SettingsCtrl, [{
    key: 'logout',
    value: function logout() {
      var _this2 = this;

      Meteor.logout(function (err) {
        if (err) return _this2.handleError(err);
        _this2.$state.go('login');
      });
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      this.$log.error('Settings modification error', err);

      this.$ionicPopup.alert({
        title: err.reason || 'Settings modification failed',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }
  }]);

  return SettingsCtrl;
}(_entities.Controller);

exports.default = SettingsCtrl;


SettingsCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$log'];