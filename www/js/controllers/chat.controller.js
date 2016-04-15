'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatCtrl = function (_Controller) {
  _inherits(ChatCtrl, _Controller);

  function ChatCtrl() {
    _classCallCheck(this, ChatCtrl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatCtrl).apply(this, arguments));

    _this.chatId = _this.$stateParams.chatId;
    _this.isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    _this.isCordova = Meteor.isCordova;

    _this.helpers({
      messages: function messages() {
        return Messages.find({ chatId: this.chatId });
      },
      data: function data() {
        return Chats.findOne(this.chatId);
      }
    });

    _this.autoScroll();
    return _this;
  }

  _createClass(ChatCtrl, [{
    key: 'sendPicture',
    value: function sendPicture() {
      var _this2 = this;

      MeteorCameraUI.getPicture({}, function (err, data) {
        if (err) return _this2.handleError(err);

        _this2.callMethod('newMessage', {
          picture: data,
          type: 'picture',
          chatId: _this2.chatId
        });
      });
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage() {
      if (_.isEmpty(this.message)) return;

      this.callMethod('newMessage', {
        text: this.message,
        type: 'text',
        chatId: this.chatId
      });

      delete this.message;
    }
  }, {
    key: 'inputUp',
    value: function inputUp() {
      var _this3 = this;

      if (this.isIOS) {
        this.keyboardHeight = 216;
      }

      this.$timeout(function () {
        _this3.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
      }, 300);
    }
  }, {
    key: 'inputDown',
    value: function inputDown() {
      if (this.isIOS) {
        this.keyboardHeight = 0;
      }

      this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
    }
  }, {
    key: 'closeKeyboard',
    value: function closeKeyboard() {
      if (this.isCordova) {
        cordova.plugins.Keyboard.close();
      }
    }
  }, {
    key: 'autoScroll',
    value: function autoScroll() {
      var _this4 = this;

      var recentMessagesNum = this.messages.length;

      this.autorun(function () {
        var currMessagesNum = _this4.getCollectionReactively('messages').length;
        var animate = recentMessagesNum != currMessagesNum;
        recentMessagesNum = currMessagesNum;

        _this4.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
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

  return ChatCtrl;
}(_entities.Controller);

exports.default = ChatCtrl;


ChatCtrl.$inject = ['$scope', '$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log'];