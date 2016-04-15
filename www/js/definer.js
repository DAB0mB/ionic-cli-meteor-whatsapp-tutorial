"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = require("./entities");

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