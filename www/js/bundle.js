/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Chats = exports.Chats = new Mongo.Collection('chats');
	var Messages = exports.Messages = new Mongo.Collection('messages');

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _collections = __webpack_require__(2);
	
	Meteor.methods({
	  newMessage: function newMessage(message) {
	    if (!this.userId) {
	      throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
	    }
	
	    check(message, Match.OneOf({
	      text: String,
	      type: String,
	      chatId: String
	    }, {
	      picture: String,
	      type: String,
	      chatId: String
	    }));
	
	    message.timestamp = new Date();
	    message.userId = this.userId;
	
	    var messageId = _collections.Messages.insert(message);
	    _collections.Chats.update(message.chatId, { $set: { lastMessage: message } });
	
	    return messageId;
	  },
	  updateName: function updateName(name) {
	    if (!this.userId) {
	      throw new Meteor.Error('not-logged-in', 'Must be logged in to update his name.');
	    }
	
	    check(name, String);
	
	    if (name.length === 0) {
	      throw Meteor.Error('name-required', 'Must provide a user name');
	    }
	
	    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
	  },
	  newChat: function newChat(otherId) {
	    if (!this.userId) {
	      throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
	    }
	
	    check(otherId, String);
	    var otherUser = Meteor.users.findOne(otherId);
	
	    if (!otherUser) {
	      throw new Meteor.Error('user-not-exists', 'Chat\'s user not exists');
	    }
	
	    var chat = {
	      userIds: [this.userId, otherId],
	      createdAt: new Date()
	    };
	
	    var chatId = _collections.Chats.insert(chat);
	
	    return chatId;
	  },
	  removeChat: function removeChat(chatId) {
	    if (!this.userId) {
	      throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
	    }
	
	    check(chatId, String);
	
	    var chat = _collections.Chats.findOne(chatId);
	
	    if (!chat || !_.include(chat.userIds, this.userId)) {
	      throw new Meteor.Error('chat-not-exists', 'Chat not exists');
	    }
	
	    _collections.Messages.remove({ chatId: chatId });
	
	    return _collections.Chats.remove({ _id: chatId });
	  },
	  updatePicture: function updatePicture(data) {
	    if (!this.userId) {
	      throw new Meteor.Error('not-logged-in', 'Must be logged in to update his picture.');
	    }
	
	    check(data, String);
	
	    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _definer = __webpack_require__(5);
	
	var _definer2 = _interopRequireDefault(_definer);
	
	var _chats = __webpack_require__(7);
	
	var _chats2 = _interopRequireDefault(_chats);
	
	var _chat = __webpack_require__(8);
	
	var _chat2 = _interopRequireDefault(_chat);
	
	var _confirmation = __webpack_require__(9);
	
	var _confirmation2 = _interopRequireDefault(_confirmation);
	
	var _login = __webpack_require__(10);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _newChat = __webpack_require__(11);
	
	var _newChat2 = _interopRequireDefault(_newChat);
	
	var _profile = __webpack_require__(12);
	
	var _profile2 = _interopRequireDefault(_profile);
	
	var _settings = __webpack_require__(13);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _input = __webpack_require__(14);
	
	var _input2 = _interopRequireDefault(_input);
	
	var _calendar = __webpack_require__(15);
	
	var _calendar2 = _interopRequireDefault(_calendar);
	
	var _chatName = __webpack_require__(16);
	
	var _chatName2 = _interopRequireDefault(_chatName);
	
	var _chatPicture = __webpack_require__(17);
	
	var _chatPicture2 = _interopRequireDefault(_chatPicture);
	
	var _newChat3 = __webpack_require__(18);
	
	var _newChat4 = _interopRequireDefault(_newChat3);
	
	var _routes = __webpack_require__(19);
	
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	var Entities = _interopRequireWildcard(_entities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Definer = function () {
	  function Definer(module, dependencies) {
	    _classCallCheck(this, Definer);
	
	    if (_.isString(module)) {
	      module = angular.module(module, dependencies);
	    }
	
	    this.module = module;
	  }
	
	  _createClass(Definer, [{
	    key: "define",
	    value: function define(Entity) {
	      if (_.isFunction(Entity)) {
	        var proto = Entity.prototype;
	        Entity.$inject = Entity.$inject || [];
	
	        if (proto instanceof Entities.Controller) this._defineController(Entity);else if (proto instanceof Entities.Provider) this._defineProvider(Entity);else if (proto instanceof Entities.Service) this._defineService(Entity);else if (proto instanceof Entities.Decorator) this._defineDecorator(Entity);else if (proto instanceof Entities.Directive) this._defineDirective(Entity);else if (proto instanceof Entities.Factory) this._defineFactory(Entity);else if (proto instanceof Entities.Filter) this._defineFilter(Entity);else if (proto instanceof Entities.Config) this._defineConfig(Entity);else if (proto instanceof Entities.Runner) this._defineRunner(Entity);else throw Error("can't define unknown entity type");
	      } else {
	        var _module;
	
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        (_module = this.module)[Entity].apply(_module, args);
	      }
	
	      return this;
	    }
	  }, {
	    key: "_defineProvider",
	    value: function _defineProvider(Provider) {
	      this.module.provider(Provider.name, Provider);
	    }
	  }, {
	    key: "_defineController",
	    value: function _defineController(Controller) {
	      this.module.controller(Controller.name, Controller);
	    }
	  }, {
	    key: "_defineService",
	    value: function _defineService(Service) {
	      this.module.service(Service.name, Service);
	    }
	  }, {
	    key: "_defineDecorator",
	    value: function _defineDecorator(Decorator) {
	      function handler() {
	        var decorator = new (Function.prototype.bind.apply(Decorator, [null].concat(Array.prototype.slice.call(arguments))))();
	        return decorator.decorate.bind(decorator);
	      }
	
	      handler.$inject = Decorator.$inject;
	      this.module.decorator(Decorator.name, handler);
	    }
	  }, {
	    key: "_defineDirective",
	    value: function _defineDirective(Directive) {
	      function handler() {
	        return new (Function.prototype.bind.apply(Directive, [null].concat(Array.prototype.slice.call(arguments))))();
	      }
	
	      handler.$inject = Directive.$inject;
	      this.module.directive(Directive.name, handler);
	    }
	  }, {
	    key: "_defineFactory",
	    value: function _defineFactory(Factory) {
	      function handler() {
	        var factory = new (Function.prototype.bind.apply(Factory, [null].concat(Array.prototype.slice.call(arguments))))();
	        return factory.create.bind(factory);
	      }
	
	      handler.$inject = Factory.$inject;
	      this.module.factory(Factory.name, handler);
	    }
	  }, {
	    key: "_defineFilter",
	    value: function _defineFilter(Filter) {
	      function handler() {
	        var filter = new (Function.prototype.bind.apply(Filter, [null].concat(Array.prototype.slice.call(arguments))))();
	        return filter.filter.bind(filter);
	      }
	
	      handler.$inject = Filter.$inject;
	      this.module.filter(Filter.name, handler);
	    }
	  }, {
	    key: "_defineConfig",
	    value: function _defineConfig(Config) {
	      function handler() {
	        var config = new (Function.prototype.bind.apply(Config, [null].concat(Array.prototype.slice.call(arguments))))();
	        return config.configure();
	      }
	
	      handler.$inject = Config.$inject;
	      this.module.config(handler);
	    }
	  }, {
	    key: "_defineRunner",
	    value: function _defineRunner(Runner) {
	      function handler() {
	        var runner = new (Function.prototype.bind.apply(Runner, [null].concat(Array.prototype.slice.call(arguments))))();
	        return runner.run();
	      }
	
	      handler.$inject = Runner.$inject;
	      this.module.run(handler);
	    }
	  }]);
	
	  return Definer;
	}();

	exports.default = Definer;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Injectable = function Injectable() {
	  var _this = this,
	      _arguments = arguments;
	
	  _classCallCheck(this, Injectable);
	
	  this.constructor.$inject.forEach(function (name, i) {
	    _this[name] = _arguments[i];
	  });
	};
	
	var Controller = exports.Controller = function (_Injectable) {
	  _inherits(Controller, _Injectable);
	
	  function Controller() {
	    _classCallCheck(this, Controller);
	
	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).apply(this, arguments));
	
	    var createViewModel = _this2.$scope && (_this2.$scope.viewModel || _this2.$scope.$viewModel);
	
	    if (createViewModel) {
	      createViewModel.call(_this2.$scope, _this2);
	    }
	    return _this2;
	  }
	
	  return Controller;
	}(Injectable);
	
	var Provider = exports.Provider = function (_Injectable2) {
	  _inherits(Provider, _Injectable2);
	
	  function Provider() {
	    _classCallCheck(this, Provider);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).apply(this, arguments));
	  }
	
	  return Provider;
	}(Injectable);
	
	var Service = exports.Service = function (_Injectable3) {
	  _inherits(Service, _Injectable3);
	
	  function Service() {
	    _classCallCheck(this, Service);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Service).apply(this, arguments));
	  }
	
	  return Service;
	}(Injectable);
	
	var Directive = exports.Directive = function (_Injectable4) {
	  _inherits(Directive, _Injectable4);
	
	  function Directive() {
	    _classCallCheck(this, Directive);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Directive).apply(this, arguments));
	  }
	
	  _createClass(Directive, [{
	    key: 'compile',
	    value: function compile() {
	      return this.link.bind(this);
	    }
	  }]);
	
	  return Directive;
	}(Injectable);
	
	var Decorator = exports.Decorator = function (_Injectable5) {
	  _inherits(Decorator, _Injectable5);
	
	  function Decorator() {
	    _classCallCheck(this, Decorator);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Decorator).apply(this, arguments));
	  }
	
	  _createClass(Decorator, [{
	    key: 'decorate',
	    value: function decorate() {
	      throw Error('Decorator#decorate() must be implemented');
	    }
	  }]);
	
	  return Decorator;
	}(Injectable);
	
	var Factory = exports.Factory = function (_Injectable6) {
	  _inherits(Factory, _Injectable6);
	
	  function Factory() {
	    _classCallCheck(this, Factory);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Factory).apply(this, arguments));
	  }
	
	  _createClass(Factory, [{
	    key: 'create',
	    value: function create() {
	      throw Error('Factory#create() must be implemented');
	    }
	  }]);
	
	  return Factory;
	}(Injectable);
	
	var Filter = exports.Filter = function (_Injectable7) {
	  _inherits(Filter, _Injectable7);
	
	  function Filter() {
	    _classCallCheck(this, Filter);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Filter).apply(this, arguments));
	  }
	
	  _createClass(Filter, [{
	    key: 'filter',
	    value: function filter() {
	      throw Error('Filter#filter() must be implemented');
	    }
	  }]);
	
	  return Filter;
	}(Injectable);
	
	var Config = exports.Config = function (_Injectable8) {
	  _inherits(Config, _Injectable8);
	
	  function Config() {
	    _classCallCheck(this, Config);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Config).apply(this, arguments));
	  }
	
	  _createClass(Config, [{
	    key: 'configure',
	    value: function configure() {
	      throw Error('Config#configure() must be implemented');
	    }
	  }]);
	
	  return Config;
	}(Injectable);
	
	var Runner = exports.Runner = function (_Injectable9) {
	  _inherits(Runner, _Injectable9);
	
	  function Runner() {
	    _classCallCheck(this, Runner);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Runner).apply(this, arguments));
	  }
	
	  _createClass(Runner, [{
	    key: 'run',
	    value: function run() {
	      throw Error('Runner#run() must be implemented');
	    }
	  }]);
	
	  return Runner;
	}(Injectable);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChatsCtrl = function (_Controller) {
	  _inherits(ChatsCtrl, _Controller);
	
	  function ChatsCtrl() {
	    _classCallCheck(this, ChatsCtrl);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatsCtrl).apply(this, arguments));
	
	    _this.helpers({
	      data: function data() {
	        return Chats.find();
	      }
	    });
	    return _this;
	  }
	
	  _createClass(ChatsCtrl, [{
	    key: 'showNewChatModal',
	    value: function showNewChatModal() {
	      this.NewChat.showModal();
	    }
	  }, {
	    key: 'remove',
	    value: function remove(chat) {
	      this.callMethod('removeChat', chat._id);
	    }
	  }]);
	
	  return ChatsCtrl;
	}(_entities.Controller);
	
	exports.default = ChatsCtrl;
	
	
	ChatsCtrl.$inject = ['$scope', 'NewChat'];
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _collections = __webpack_require__(2);
	
	var _entities = __webpack_require__(6);
	
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
	        return _collections.Messages.find({ chatId: this.chatId });
	      },
	      data: function data() {
	        return _collections.Chats.findOne(this.chatId);
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
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ConfirmationCtrl = function (_Controller) {
	  _inherits(ConfirmationCtrl, _Controller);
	
	  function ConfirmationCtrl() {
	    _classCallCheck(this, ConfirmationCtrl);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmationCtrl).apply(this, arguments));
	
	    _this.phone = _this.$state.params.phone;
	    return _this;
	  }
	
	  _createClass(ConfirmationCtrl, [{
	    key: 'confirm',
	    value: function confirm() {
	      var _this2 = this;
	
	      if (_.isEmpty(this.code)) return;
	
	      Accounts.verifyPhone(this.phone, this.code, function (err) {
	        if (err) return _this2.handleError(err);
	        _this2.$state.go('profile');
	      });
	    }
	  }, {
	    key: 'handleError',
	    value: function handleError(err) {
	      this.$log.error('Confirmation error ', err);
	
	      this.$ionicPopup.alert({
	        title: err.reason || 'Confirmation failed',
	        template: 'Please try again',
	        okType: 'button-positive button-clear'
	      });
	    }
	  }]);
	
	  return ConfirmationCtrl;
	}(_entities.Controller);
	
	exports.default = ConfirmationCtrl;
	
	
	ConfirmationCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$log'];
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
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
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _collections = __webpack_require__(2);
	
	var _entities = __webpack_require__(6);
	
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
	
	      var chat = _collections.Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });
	
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
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
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
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
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
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var input = function (_Directive) {
	  _inherits(input, _Directive);
	
	  function input() {
	    _classCallCheck(this, input);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(input).apply(this, arguments));
	
	    _this.restrict = 'E';
	
	    _this.scope = {
	      'returnClose': '=',
	      'onReturn': '&',
	      'onFocus': '&',
	      'onBlur': '&'
	    };
	    return _this;
	  }
	
	  _createClass(input, [{
	    key: 'link',
	    value: function link(scope, element) {
	      var _this2 = this;
	
	      element.bind('focus', function (e) {
	        if (!scope.onFocus) return;
	
	        _this2.$timeout(function () {
	          scope.onFocus();
	        });
	      });
	
	      element.bind('blur', function (e) {
	        if (!scope.onBlur) return;
	
	        _this2.$timeout(function () {
	          scope.onBlur();
	        });
	      });
	
	      element.bind('keydown', function (e) {
	        if (e.which != 13) return;
	
	        if (scope.returnClose) {
	          element[0].blur();
	        }
	
	        if (scope.onReturn) {
	          _this2.$timeout(function () {
	            scope.onReturn();
	          });
	        }
	      });
	    }
	  }]);
	
	  return input;
	}(_entities.Directive);
	
	exports.default = input;
	
	
	input.$inject = ['$timeout'];
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var calendar = function (_Filter) {
	  _inherits(calendar, _Filter);
	
	  function calendar() {
	    _classCallCheck(this, calendar);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(calendar).apply(this, arguments));
	  }
	
	  _createClass(calendar, [{
	    key: 'filter',
	    value: function filter(time) {
	      if (!time) return;
	
	      return moment(time).calendar(null, {
	        lastDay: '[Yesterday]',
	        sameDay: 'LT',
	        lastWeek: 'dddd',
	        sameElse: 'DD/MM/YY'
	      });
	    }
	  }]);
	
	  return calendar;
	}(_entities.Filter);

	exports.default = calendar;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var chatName = function (_Filter) {
	  _inherits(chatName, _Filter);
	
	  function chatName() {
	    _classCallCheck(this, chatName);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(chatName).apply(this, arguments));
	  }
	
	  _createClass(chatName, [{
	    key: 'filter',
	    value: function filter(chat) {
	      if (!chat) return;
	
	      var otherId = _.without(chat.userIds, Meteor.userId())[0];
	      var otherUser = Meteor.users.findOne(otherId);
	      var hasName = otherUser && otherUser.profile && otherUser.profile.name;
	
	      return hasName ? otherUser.profile.name : chat.name || 'NO NAME';
	    }
	  }]);
	
	  return chatName;
	}(_entities.Filter);

	exports.default = chatName;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var chatPicture = function (_Filter) {
	  _inherits(chatPicture, _Filter);
	
	  function chatPicture() {
	    _classCallCheck(this, chatPicture);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(chatPicture).apply(this, arguments));
	  }
	
	  _createClass(chatPicture, [{
	    key: 'filter',
	    value: function filter(chat) {
	      if (!chat) return;
	
	      var otherId = _.without(chat.userIds, Meteor.userId())[0];
	      var otherUser = Meteor.users.findOne(otherId);
	      var hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;
	
	      return hasPicture ? otherUser.profile.picture : chat.picture || '/user-default.svg';
	    }
	  }]);
	
	  return chatPicture;
	}(_entities.Filter);

	exports.default = chatPicture;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
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
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesRunner = exports.RoutesConfig = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(6);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map