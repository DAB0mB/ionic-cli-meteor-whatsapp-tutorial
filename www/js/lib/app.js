'use strict';

var _definer = require('../definer');

var _definer2 = _interopRequireDefault(_definer);

var _chats = require('../controllers/chats.controller');

var _chats2 = _interopRequireDefault(_chats);

var _chat = require('../controllers/chat.controller');

var _chat2 = _interopRequireDefault(_chat);

var _confirmation = require('../controllers/confirmation.controller');

var _confirmation2 = _interopRequireDefault(_confirmation);

var _login = require('../controllers/login.controller');

var _login2 = _interopRequireDefault(_login);

var _newChat = require('../controllers/new-chat.controller');

var _newChat2 = _interopRequireDefault(_newChat);

var _profile = require('../controllers/profile.controller');

var _profile2 = _interopRequireDefault(_profile);

var _settings = require('../controllers/settings.controller');

var _settings2 = _interopRequireDefault(_settings);

var _input = require('../directives/input.directive');

var _input2 = _interopRequireDefault(_input);

var _calendar = require('../filters/calendar.filter');

var _calendar2 = _interopRequireDefault(_calendar);

var _chatName = require('../filters/chat-name.filter');

var _chatName2 = _interopRequireDefault(_chatName);

var _chatPicture = require('../filters/chat-picture.filter');

var _chatPicture2 = _interopRequireDefault(_chatPicture);

var _newChat3 = require('../services/new-chat.service');

var _newChat4 = _interopRequireDefault(_newChat3);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App
// Modules
var App = angular.module('Whatsapp', ['angular-meteor', 'angular-meteor.auth', 'angularMoment', 'ionic']);

new _definer2.default(App).define(_chats2.default).define(_chat2.default).define(_confirmation2.default).define(_login2.default).define(_newChat2.default).define(_profile2.default).define(_settings2.default).define(_input2.default).define(_calendar2.default).define(_chatName2.default).define(_chatPicture2.default).define(_newChat4.default).define(_routes.RoutesConfig).define(_routes.RoutesRunner);

// Startup
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['Whatsapp']);
}