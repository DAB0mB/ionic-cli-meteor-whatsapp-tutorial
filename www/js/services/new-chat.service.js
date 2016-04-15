'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewChat = function (_Service) {
  _inherits(NewChat, _Service);

  function NewChat() {
    _classCallCheck(this, NewChat);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewChat).apply(this, arguments));

    _this.templateUrl = 'client/templates/new-chat.html';
    return _this;
  }

  _createClass(NewChat, [{
    key: 'showModal',
    value: function showModal() {
      var _this2 = this;

      this.scope = this.$rootScope.$new();

      this.$ionicModal.fromTemplateUrl(this.templateUrl, {
        scope: this.scope
      }).then(function (modal) {
        _this2.modal = modal;
        _this2.modal.show();
      });
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      this.scope.$destroy();
      this.modal.remove();
    }
  }]);

  return NewChat;
}(_entities.Service);

exports.default = NewChat;


NewChat.$inject = ['$rootScope', '$ionicModal'];