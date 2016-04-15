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