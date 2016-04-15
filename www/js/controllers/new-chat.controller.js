'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('../entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewChatCtrl = function (_Controller) {
  _inherits(NewChatCtrl, _Controller);

  function NewChatCtrl() {
    _classCallCheck(this, NewChatCtrl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewChatCtrl).apply(this, arguments));

    _this.subscribe('users');

    _this.helpers({
      users: function users() {
        return Meteor.users.find({ _id: { $ne: this.currentUserId } });
      }
    });
    return _this;
  }

  _createClass(NewChatCtrl, [{
    key: 'newChat',
    value: function newChat(userId) {
      var _this2 = this;

      var chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });

      if (chat) {
        this.hideNewChatModal();
        return this.goToChat(chat._id);
      }

      this.callMethod('newChat', userId, function (err, chatId) {
        _this2.hideNewChatModal();
        if (err) return _this2.handleError(err);
        _this2.goToChat(chatId);
      });
    }
  }, {
    key: 'hideNewChatModal',
    value: function hideNewChatModal() {
      this.NewChat.hideModal();
    }
  }, {
    key: 'goToChat',
    value: function goToChat(chatId) {
      this.$state.go('tab.chat', { chatId: chatId });
    }
  }, {
    key: 'handleError',
    value: function handleError(err) {
      this.$log.error('New chat creation error ', err);

      this.$ionicPopup.alert({
        title: err.reason || 'New chat creation failed',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }
  }]);

  return NewChatCtrl;
}(_entities.Controller);

exports.default = NewChatCtrl;


NewChatCtrl.$inject = ['$scope', '$state', 'NewChat', '$ionicPopup', '$log'];