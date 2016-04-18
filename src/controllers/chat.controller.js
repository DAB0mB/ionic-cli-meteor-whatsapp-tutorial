import ionic from 'ionic';
import keyboard from 'cordova/keyboard';
import { _ } from 'meteor/underscore';
import { Chats, Messages } from 'server/collections';
import { Controller } from '../entities';

export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.chatId = this.$stateParams.chatId;
    this.isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    this.helpers({
      messages() {
        return Messages.find({ chatId: this.chatId });
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });

    this.autoScrollBottom();
  }

  sendMessage() {
    if (_.isEmpty(this.message)) return;

    this.callMethod('newMessage', {
      text: this.message,
      type: 'text',
      chatId: this.chatId
    });

    delete this.message;
  }

  inputUp () {
    if (this.isIOS) {
      this.keyboardHeight = 216;
    }

    this.scrollBottom(true);
  }

  inputDown () {
    if (this.isIOS) {
      this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  closeKeyboard () {
    if (keyboard) {
      keyboard.close();
    }
  }

  autoScrollBottom() {
    let recentMessagesNum = this.messages.length;

    this.autorun(() => {
      const currMessagesNum = this.getCollectionReactively('messages').length;
      const animate = recentMessagesNum != currMessagesNum;
      recentMessagesNum = currMessagesNum;
      this.scrollBottom(animate);
    });
  }

  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  }

  handleError(err) {
    this.$log.error('Profile save error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log'];
