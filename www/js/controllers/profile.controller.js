'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileCtrl = function (_Controller) {
  _inherits(ProfileCtrl, _Controller);

  function ProfileCtrl() {
    _classCallCheck(this, ProfileCtrl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileCtrl).apply(this, arguments));

    var profile = _this.currentUser && _this.currentUser.profile;
    _this.name = profile ? profile.name : '';
    return _this;
  }

  _createClass(ProfileCtrl, [{
    key: 'updatePicture',
    value: function updatePicture() {
      var _this2 = this;

      MeteorCameraUI.getPicture({ width: 60, height: 60 }, function (err, data) {
        if (err) return _this2.handleError(err);

        _this2.$ionicLoading.show({
          template: 'Updating picture...'
        });

        _this2.callMethod('updatePicture', data, function (err) {
          _this2.$ionicLoading.hide();
          _this2.handleError(err);
        });
      });
    }
  }, {
    key: 'updateName',
    value: function updateName() {
      var _this3 = this;

      if (_.isEmpty(this.name)) return;

      this.callMethod('updateName', this.name, function (err) {
        if (err) return _this3.handleError(err);
        _this3.$state.go('tab.chats');
      });
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      if (err.error == 'cancel') return;
      this.$log.error('Profile save error ', err);

      this.$ionicPopup.alert({
        title: err.reason || 'Save failed',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }
  }]);

  return ProfileCtrl;
}(_entities.Controller);

exports.default = ProfileCtrl;


ProfileCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$log'];