'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutesRunner = exports.RoutesConfig = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require('./entities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutesConfig = exports.RoutesConfig = function (_Config) {
  _inherits(RoutesConfig, _Config);

  function RoutesConfig() {
    _classCallCheck(this, RoutesConfig);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoutesConfig).apply(this, arguments));

    _this.isAuthorized = ['$auth', _this.isAuthorized.bind(_this)];
    return _this;
  }

  _createClass(RoutesConfig, [{
    key: 'configure',
    value: function configure() {
      this.$stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html',
        resolve: {
          user: this.isAuthorized,
          chats: function chats() {
            return Meteor.subscribe('chats');
          }
        }
      }).state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chats.html',
            controller: 'ChatsCtrl as chats'
          }
        }
      }).state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chat.html',
            controller: 'ChatCtrl as chat'
          }
        }
      }).state('login', {
        url: '/login',
        templateUrl: 'client/templates/login.html',
        controller: 'LoginCtrl as logger'
      }).state('confirmation', {
        url: '/confirmation/:phone',
        templateUrl: 'client/templates/confirmation.html',
        controller: 'ConfirmationCtrl as confirmation'
      }).state('profile', {
        url: '/profile',
        templateUrl: 'client/templates/profile.html',
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      }).state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'client/templates/settings.html',
            controller: 'SettingsCtrl as settings'
          }
        }
      });

      this.$urlRouterProvider.otherwise('tab/chats');
    }
  }, {
    key: 'isAuthorized',
    value: function isAuthorized($auth) {
      return $auth.awaitUser();
    }
  }]);

  return RoutesConfig;
}(_entities.Config);

var RoutesRunner = exports.RoutesRunner = function (_Runner) {
  _inherits(RoutesRunner, _Runner);

  function RoutesRunner() {
    _classCallCheck(this, RoutesRunner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RoutesRunner).apply(this, arguments));
  }

  _createClass(RoutesRunner, [{
    key: 'run',
    value: function run() {
      var _this3 = this;

      this.$rootScope.$on('$stateChangeError', function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var err = _.last(args);

        if (err === 'AUTH_REQUIRED') {
          _this3.$state.go('login');
        }
      });
    }
  }]);

  return RoutesRunner;
}(_entities.Runner);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
RoutesRunner.$inject = ['$rootScope', '$state'];