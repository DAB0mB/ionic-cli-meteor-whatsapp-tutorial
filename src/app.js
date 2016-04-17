import angular from 'angular';
import ionic from 'ionic';
import keyboard from 'cordova/keyboard';
import statusbar from 'cordova/status-bar';

import Definer from './definer';
import ChatsCtrl from './controllers/chats.controller';
import ChatCtrl from './controllers/chat.controller';
import ConfirmationCtrl from './controllers/confirmation.controller';
import LoginCtrl from './controllers/login.controller';
import NewChatCtrl from './controllers/new-chat.controller';
import ProfileCtrl from './controllers/profile.controller';
import SettingsCtrl from './controllers/settings.controller';
import InputDirective from './directives/input.directive';
import CalendarFilter from './filters/calendar.filter';
import ChatNameFilter from './filters/chat-name.filter';
import ChatPictureFilter from './filters/chat-picture.filter';
import NewChatService from './services/new-chat.service';
import { RoutesConfig, RoutesRunner } from './routes';

export const App = angular.module('Whatsapp', [
  'angular-meteor',
  'angular-meteor.auth',
  'angularMoment',
  'ionic'
]);

new Definer(App)
  .define(ChatsCtrl)
  .define(ChatCtrl)
  .define(ConfirmationCtrl)
  .define(LoginCtrl)
  .define(NewChatCtrl)
  .define(ProfileCtrl)
  .define(SettingsCtrl)
  .define(InputDirective)
  .define(CalendarFilter)
  .define(ChatNameFilter)
  .define(ChatPictureFilter)
  .define(NewChatService)
  .define(RoutesConfig)
  .define(RoutesRunner);

ionic.Platform.ready(() => {
  if (keyboard) {
    keyboard.hideKeyboardAccessoryBar(true);
    keyboard.disableScroll(true);
  }

  if (statusbar) {
    statusbar.styleLightContent();
  }

  angular.bootstrap(document, ['Whatsapp']);
});
