// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/Vector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector =
/*#__PURE__*/
function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this._x = x || 0;
    this._y = y || 0;
    this.vectorLimit = undefined;
  }

  _createClass(Vector, [{
    key: "mult",
    value: function mult(factor) {
      var factor2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.x *= factor;
      this.y *= factor2 || factor;
    }
  }, {
    key: "div",
    value: function div(factor) {
      var factor2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.x /= factor;
      this.y /= factor2 || factor;
    }
  }, {
    key: "add",
    value: function add(factor) {
      var factor2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.x += factor;
      this.y += factor2 || factor;
    }
  }, {
    key: "sub",
    value: function sub(factor) {
      var factor2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.x -= factor;
      this.y -= factor2 || factor;
    }
  }, {
    key: "limit",
    value: function limit(_limit) {
      var limit2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.vectorLimit = {
        x: _limit,
        y: limit2 || _limit
      };
      this.x = this.x > this.vectorLimit.x ? this.vectorLimit.x : this.x;
      this.y = this.y > this.vectorLimit.y ? this.vectorLimit.y : this.y;
    }
  }, {
    key: "unLimit",
    value: function unLimit() {
      this.vectorLimit = undefined;
    }
  }, {
    key: "heading",
    value: function heading(x2, y2) {
      return Math.atan2(y2 - this.y, x2 - this.x);
    }
  }, {
    key: "x",
    set: function set(x) {
      this._x = this.vectorLimit && x > this.vectorLimit.x ? this.vectorLimit.x : x;
    },
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    set: function set(y) {
      this._y = this.vectorLimit && y > this.vectorLimit.y ? this.vectorLimit.y : y;
    },
    get: function get() {
      return this._y;
    }
  }]);

  return Vector;
}();

exports.default = Vector;
},{}],"../src/Calc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calc =
/*#__PURE__*/
function () {
  function Calc() {
    _classCallCheck(this, Calc);
  }

  _createClass(Calc, [{
    key: "circlesCollide",
    value: function circlesCollide(x1, y1, r1, x2, y2, r2) {
      return Math.abs((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < (r1 + r2) * (r1 + r2);
    }
  }], [{
    key: "constrain",
    value: function constrain(n, min, max) {
      return n < min ? min : n && n > max ? max : n;
    }
  }, {
    key: "createVector",
    value: function createVector(x, y) {
      return new _Vector.default(x, y);
    }
  }, {
    key: "createRandomVector",
    value: function createRandomVector() {
      var x = Math.random() > 0.5 ? Math.random() : -Math.random();
      var y = Math.random() > 0.5 ? Math.random() : -Math.random();
      return new _Vector.default(x, y);
    }
  }, {
    key: "create3DVector",
    value: function create3DVector() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return {
        x: x,
        y: y,
        z: z
      };
    }
  }, {
    key: "dist",
    value: function dist(x1, y1, x2, y2) {
      return Math.hypot(x2 - x1, y2 - y1);
    }
  }, {
    key: "heading",
    value: function heading(x1, y1, x2, y2) {
      return Math.atan2(y2 - y1, x2 - x1);
    }
  }, {
    key: "toDegrees",
    value: function toDegrees(angle) {
      return angle * (180 / Math.PI);
    }
  }, {
    key: "toRadians",
    value: function toRadians(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: "invertAngle",
    value: function invertAngle(angle) {
      return (angle + Math.PI) % (2 * Math.PI);
    }
  }, {
    key: "random",
    value: function random() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: "easingFunctions",
    value: function easingFunctions() {
      return {
        // no easing, no acceleration
        linear: function linear(t) {
          return t;
        },
        // accelerating from zero velocity
        easeInQuad: function easeInQuad(t) {
          return t * t;
        },
        // decelerating to zero velocity
        easeOutQuad: function easeOutQuad(t) {
          return t * (2 - t);
        },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function easeInOutQuad(t) {
          return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        // accelerating from zero velocity 
        easeInCubic: function easeInCubic(t) {
          return t * t * t;
        },
        // decelerating to zero velocity 
        easeOutCubic: function easeOutCubic(t) {
          return --t * t * t + 1;
        },
        // acceleration until halfway, then deceleration 
        easeInOutCubic: function easeInOutCubic(t) {
          return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        // accelerating from zero velocity 
        easeInQuart: function easeInQuart(t) {
          return t * t * t * t;
        },
        // decelerating to zero velocity 
        easeOutQuart: function easeOutQuart(t) {
          return 1 - --t * t * t * t;
        },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function easeInOutQuart(t) {
          return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        },
        // accelerating from zero velocity
        easeInQuint: function easeInQuint(t) {
          return t * t * t * t * t;
        },
        // decelerating to zero velocity
        easeOutQuint: function easeOutQuint(t) {
          return 1 + --t * t * t * t * t;
        },
        // acceleration until halfway, then deceleration 
        easeInOutQuint: function easeInOutQuint(t) {
          return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
        }
      };
    }
  }, {
    key: "elasticEasingFunctions",
    value: function elasticEasingFunctions() {
      return {
        // elastic bounce effect at the beginning
        easeInElastic: function easeInElastic(t) {
          return (.04 - .04 / t) * Math.sin(25 * t) + 1;
        },
        // elastic bounce effect at the end
        easeOutElastic: function easeOutElastic(t) {
          return .04 * t / --t * Math.sin(25 * t);
        },
        // elastic bounce effect at the beginning and end
        easeInOutElastic: function easeInOutElastic(t) {
          return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;
        }
      };
    }
  }]);

  return Calc;
}();

exports.default = Calc;
},{"./Vector":"../src/Vector.js"}],"../src/Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Canvas);

    this.width = config.width || 600;
    this.height = config.height || 600;
    this.bgColor = config.bgColor || '#000';
    this.fps = config.fps || 60;
    this.appendToBody();
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.canvasPosition = this.canvas.getBoundingClientRect();
    this.stop = false;
  }

  _createClass(Canvas, [{
    key: "appendToBody",
    value: function appendToBody() {
      var c = document.createElement('canvas');
      c.width = this.width;
      c.height = this.height;
      c.style.background = this.bgColor;
      document.body.append(c);
    }
  }, {
    key: "startAnimation",
    value: function startAnimation() {
      var stop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.stop = stop;
    }
  }, {
    key: "stopAnimation",
    value: function stopAnimation() {
      var stop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.stop = stop;
    }
  }, {
    key: "rect",
    value: function rect(_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height,
          color = _ref.color,
          strokeWidth = _ref.strokeWidth,
          strokeColor = _ref.strokeColor,
          shadow = _ref.shadow,
          rotate = _ref.rotate;
      this.ctx.fillStyle = color;

      if (strokeWidth) {
        this.ctx.strokeWidth = strokeWidth;
        this.ctx.strokeStyle = strokeColor;
      }

      if (shadow) {
        this.addShadow(shadow);
      }

      if (rotate) {
        this.ctx.translate(x + width / 2, y + height / 2);
        this.ctx.rotate(rotate);
        this.ctx.fillRect(-width / 2, -height / 2, width, height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        return;
      }

      this.ctx.fillRect(x, y, width, height);
    }
  }, {
    key: "line",
    value: function line(_ref2) {
      var x1 = _ref2.x1,
          y1 = _ref2.y1,
          x2 = _ref2.x2,
          y2 = _ref2.y2,
          _ref2$lineWidth = _ref2.lineWidth,
          lineWidth = _ref2$lineWidth === void 0 ? 1 : _ref2$lineWidth,
          shadow = _ref2.shadow,
          _ref2$color = _ref2.color,
          color = _ref2$color === void 0 ? '#fff' : _ref2$color;
      this.ctx.beginPath();

      if (shadow) {
        this.addShadow(shadow);
      }

      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "arc",
    value: function arc(_ref3) {
      var x = _ref3.x,
          y = _ref3.y,
          r = _ref3.r,
          color = _ref3.color,
          strokeWidth = _ref3.strokeWidth,
          strokeColor = _ref3.strokeColor;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true);

      if (strokeWidth) {
        this.ctx.stroekeWidth = strokeWidth;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.stroke();
      }

      if (color) {
        this.ctx.fillStyle = color;
        this.ctx.fill();
      }
    }
  }, {
    key: "addShadow",
    value: function addShadow(_ref4) {
      var _ref4$offsetX = _ref4.offsetX,
          offsetX = _ref4$offsetX === void 0 ? 2 : _ref4$offsetX,
          _ref4$offsetY = _ref4.offsetY,
          offsetY = _ref4$offsetY === void 0 ? 2 : _ref4$offsetY,
          _ref4$blur = _ref4.blur,
          blur = _ref4$blur === void 0 ? 2 : _ref4$blur,
          _ref4$color = _ref4.color,
          color = _ref4$color === void 0 ? 'rgba(0, 0, 0, 0.5)' : _ref4$color;
      this.ctx.shadowOffsetX = offsetX;
      this.ctx.shadowOffsetY = offsetY;
      this.ctx.shadowBlur = blur;
      this.ctx.shadowColor = color;
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.time = time;

      if (!this.stop) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render(time);
        setTimeout(function () {
          window.requestAnimationFrame(_this.init.bind(_this));
        }, 1000 / this.fps);
      }
    }
  }, {
    key: "render",
    value: function render(time) {// extend Canvas and overwrite
    }
  }]);

  return Canvas;
}(); // img.setAttribute('width', '100%');
// img.setAttribute('height', '100%');


exports.default = Canvas;
},{}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Calc", {
  enumerable: true,
  get: function () {
    return _Calc.default;
  }
});
Object.defineProperty(exports, "Canvas", {
  enumerable: true,
  get: function () {
    return _Canvas.default;
  }
});
Object.defineProperty(exports, "Vector", {
  enumerable: true,
  get: function () {
    return _Vector.default;
  }
});

var _Calc = _interopRequireDefault(require("./Calc"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Calc":"../src/Calc.js","./Canvas":"../src/Canvas.js","./Vector":"../src/Vector.js"}],"classes/Particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleParticle = exports.SquareParticle = exports.Particle = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle =
/*#__PURE__*/
function () {
  function Particle(morningstar, position, velocity, acceleration, angle) {
    _classCallCheck(this, Particle);

    this.ctx = morningstar.ctx;
    this.ms = morningstar;
    this._position = position;
    this.velocity = velocity;
    this.acc = acceleration;
    this.alpha = 1;
    this.angle = angle;
  }

  _createClass(Particle, [{
    key: "setColor",
    value: function setColor(color) {
      return color;
    }
  }, {
    key: "position",
    set: function set(position) {
      var z = position.z;

      if (z > 5) {
        position.z = 3;
      }

      this._position = position;
    },
    get: function get() {
      return this._position;
    }
  }]);

  return Particle;
}();

exports.Particle = Particle;

var SquareParticle =
/*#__PURE__*/
function (_Particle) {
  _inherits(SquareParticle, _Particle);

  function SquareParticle(morningstar, position, width, height, color, velocity, acceleration, angle) {
    var _this;

    _classCallCheck(this, SquareParticle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SquareParticle).call(this, morningstar, position, velocity, acceleration, angle));
    _this.width = width;
    _this.height = height;
    _this.color = color;
    return _this;
  }

  _createClass(SquareParticle, [{
    key: "render",
    value: function render() {
      var position = this.position,
          width = this.width,
          height = this.height,
          color = this.color,
          alpha = this.alpha,
          angle = this.angle,
          velocity = this.velocity;
      this.ms.rect(_objectSpread({}, position, {
        width: width,
        height: height,
        color: "rgba(100, 100, 0, ".concat(alpha, ")")
      }));
      this.alpha -= 0.01;
      this.position.x = this.position.x + Math.cos(angle) * velocity;
      this.position.y = this.position.y + Math.sin(angle) * velocity;
      this.velocity += this.acc;
    }
  }]);

  return SquareParticle;
}(Particle);

exports.SquareParticle = SquareParticle;

var CircleParticle =
/*#__PURE__*/
function (_Particle2) {
  _inherits(CircleParticle, _Particle2);

  function CircleParticle(morningstar, position, r, velocity, acceleration, angle) {
    var _this2;

    _classCallCheck(this, CircleParticle);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(CircleParticle).call(this, morningstar, position, velocity, acceleration, angle));
    _this2.r = r;
    return _this2;
  }

  _createClass(CircleParticle, [{
    key: "render",
    value: function render(time) {
      var position = this.position,
          r = this.r,
          alpha = this.alpha,
          angle = this.angle,
          velocity = this.velocity;
      var radius = Math.sin(time / 200) + r;
      this.ms.arc(_objectSpread({}, position, {
        r: radius,
        color: "rgba(255, 100, 0, ".concat(alpha, ")")
      }));
      this.alpha -= 0.01;
      this.position.x = this.position.x + Math.cos(angle) * velocity;
      this.position.y = this.position.y + Math.sin(angle) * velocity;
      this.velocity += this.acc;
    }
  }]);

  return CircleParticle;
}(Particle);

exports.CircleParticle = CircleParticle;
},{}],"src/4.js":[function(require,module,exports) {
"use strict";

var _src = require("../../src");

var _Particle = require("../classes/Particle");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle =
/*#__PURE__*/
function () {
  function Circle(morningstar, pos, r, vel, acc, angle, color) {
    _classCallCheck(this, Circle);

    this.ctx = morningstar.ctx;
    this.ms = morningstar;
    this.x = pos.x;
    this.y = pos.y;
    this.velocity = vel;
    this.acceleration = acc;
    this.r = r;
    this.angle = angle;
    this.color = color;
  }

  _createClass(Circle, [{
    key: "circleCollisionPoint",
    value: function circleCollisionPoint(x1, y1, r1, x2, y2, r2) {
      var collisionPointX = (x1 * r2 + x2 * r1) / (r1 + r2);
      var collisionPointY = (y1 * r2 + y2 * r1) / (r1 + r2);
      return [collisionPointX, collisionPointY];
    }
  }, {
    key: "collision",
    value: function collision() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.ms.circles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var circle = _step.value;
          if (circle === this) break;

          if (this.movingCircleCollision(this, circle)) {
            return circle;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "circlesCollide",
    value: function circlesCollide(x1, y1, r1, x2, y2, r2) {
      var dx = x2 - x1;
      var dy = y2 - y1;
      var radii = r1 + r2;
      return dx * dx + dy * dy < radii * radii;
    }
  }, {
    key: "movingCircleCollision",
    value: function movingCircleCollision(c1, c2) {
      var combinedRadii,
          overlap,
          xSide,
          ySide,
          s = {},
          p1A = {},
          p1B = {},
          p2A = {},
          p2B = {};
      c1.mass = c1.mass || 1;
      c2.mass = c2.mass || 1;
      c1.vx = c1.x + Math.cos(c1.angle) * c1.velocity;
      c1.vy = c1.y + Math.sin(c1.angle) * c1.velocity;
      c2.vx = c2.x + Math.cos(c2.angle) * c2.velocity;
      c2.vy = c2.y + Math.sin(c2.angle) * c2.velocity;
      s.vx = c2.x - c1.x;
      s.vy = c2.y - c1.y;
      s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      combinedRadii = c1.r + c2.r;

      if (s.magnitude < combinedRadii) {
        overlap = combinedRadii - s.magnitude;
        overlap += 0.3; // Normalize vector

        s.dx = s.vx / s.magnitude;
        s.dy = s.vy / s.magnitude;
        s.vxHalf = Math.abs(s.dx * overlap / 2);
        s.vyHalf = Math.abs(s.dy * overlap / 2);
        c1.x > c2.x ? xSide = 1 : xSide = -1;
        c1.y > c2.y ? ySide = 1 : ySide = -1;
        c1.x = c1.x + s.vxHalf * xSide;
        c1.y = c1.y + s.vyHalf * ySide;
        c2.x = c2.x + s.vxHalf * -xSide;
        c2.y = c2.y + s.vyHalf * -ySide;
        s.lx = s.vy;
        s.ly = -s.vx;
        var dp1 = c1.vx * s.dx + c1.vy * s.dy;
        p1A.x = dp1 * s.dx;
        p1A.y = dp1 * s.dy;
        var dp2 = c1.vx * (s.lx / s.magnitude) + c1.vy * (s.ly / s.magnitude);
        p1B.x = dp2 * (s.lx / s.magnitude);
        p1B.y = dp2 * (s.ly / s.magnitude);
        var dp3 = c2.vx * s.dx + c2.vy * s.dy;
        p2A.x = dp3 * s.dx;
        p2A.y = dp3 * s.dy;
        var dp4 = c2.vx * (s.lx / s.magnitude) + c2.vy * (s.ly / s.magnitude);
        p2B.x = dp4 * (s.lx / s.magnitude);
        p2B.y = dp4 * (s.ly / s.magnitude);
        c1.bounce = {};
        c1.bounce.x = p1B.x + p2A.x;
        c1.bounce.y = p1B.y + p2A.y;
        c2.bounce = {};
        c2.bounce.x = p1A.x + p2B.x;
        c2.bounce.y = p1A.y + p2B.y;
        var vx = c1.bounce.x / c1.mass;
        var vy = c1.bounce.y / c1.mass;
        var vx2 = c2.bounce.x / c2.mass;
        var vy2 = c2.bounce.y / c2.mass;
        var deltaX = vx - c1.x;
        var deltaY = vy - c1.y;
        var deltaX2 = vx2 - c2.x;
        var deltaY2 = vy2 - c2.y;
        c2.angle = Math.atan2(deltaY, deltaX);
        c1.angle = Math.atan2(deltaY2, deltaX2);
        return true;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var ms = this.ms,
          x = this.x,
          y = this.y,
          r = this.r;
      var collidedCircle = this.collision();

      if (collidedCircle) {
        var x2 = collidedCircle.x,
            y2 = collidedCircle.y,
            r2 = collidedCircle.r;
        console.log('hit'); // EXPLODE

        var _this$circleCollision = this.circleCollisionPoint(x, y, r, x2, y2, r2),
            _this$circleCollision2 = _slicedToArray(_this$circleCollision, 2),
            collisionX = _this$circleCollision2[0],
            collisionY = _this$circleCollision2[1];

        ms.createParticles(collisionX, collisionY);
        collidedCircle.r = collidedCircle.r / 2;
        this.r = this.r / 2; // this.ms.stopAnimation()
      }
    }
  }, {
    key: "reflectionAngleLeftRight",
    value: function reflectionAngleLeftRight(angle) {
      return Math.PI - angle;
    }
  }, {
    key: "reflectionAngleTopBottom",
    value: function reflectionAngleTopBottom(angle) {
      return -angle;
    }
  }, {
    key: "render",
    value: function render() {
      var x = this.x,
          y = this.y,
          r = this.r,
          velocity = this.velocity,
          angle = this.angle;
      this.x = x + Math.cos(angle) * velocity;
      this.y = y + Math.sin(angle) * velocity;

      if (this.x > this.ms.canvas.width - r) {
        this.angle = this.reflectionAngleLeftRight(angle);
      }

      if (this.x < r) {
        this.angle = this.reflectionAngleLeftRight(angle);
      }

      if (this.y > this.ms.canvas.height - r) {
        this.angle = this.reflectionAngleTopBottom(angle);
      }

      if (this.y < r) {
        this.angle = this.reflectionAngleTopBottom(angle);
      }

      this.ms.arc({
        x: x,
        y: y,
        r: r,
        color: this.color
      });
    }
  }]);

  return Circle;
}();

var Circles =
/*#__PURE__*/
function (_Canvas) {
  _inherits(Circles, _Canvas);

  function Circles() {
    var _this;

    _classCallCheck(this, Circles);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Circles).call(this, {
      fps: 60,
      bgColor: 'rgb(50, 50, 50)',
      width: window.innerWidth,
      height: window.innerHeight
    }));
    _this.circles = [];
    _this.particles = [];
    _this.colors = ['rgb(200, 148, 82)', 'rgb(193, 200, 82)', 'rgb(134, 200, 82)', 'rgb(82, 200, 89)', 'rgb(82, 200, 148)', 'rgb(82, 193, 200)'];

    _this.createCircles();

    _this.init();

    return _this;
  }

  _createClass(Circles, [{
    key: "bg",
    value: function bg() {
      var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
      grd.addColorStop(0, "#1f3342");
      grd.addColorStop(1, "black");
      this.ctx.fillStyle = grd;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "createCircles",
    value: function createCircles() {
      for (var i = 0; i < 20; i++) {
        var angle = Math.random() * Math.PI * 2;

        var r = _src.Calc.random(10, 20);

        var pos = _src.Calc.createVector(_src.Calc.random(r, this.width - r), _src.Calc.random(r, this.height - r));

        var velocity = _src.Calc.random(5, 10);

        var acceleration = Math.random();

        var color = _src.Calc.random(0, 5);

        this.circles.push(new Circle(this, pos, r, velocity, acceleration, angle, this.colors[color]));
      }
    }
  }, {
    key: "createParticles",
    value: function createParticles(x, y) {
      for (var i = 0; i < 100; i++) {
        var angle = Math.random() * Math.PI * 2;
        var velocity = Math.random();
        var acceleration = Math.random() / 50;
        var vx = x + Math.cos(angle) * velocity;
        var vy = y + Math.sin(angle) * velocity;

        var r = _src.Calc.random(1, 5);

        this.particles.push(new _Particle.SquareParticle(this, _src.Calc.create3DVector(vx, vy), r, r, 'red', velocity, acceleration, angle));
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.bg();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.circles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var circle = _step2.value;

          if (circle.r < 1) {
            this.circles.splice(circle, 1);
            continue;
          }

          circle.render();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.circles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _circle = _step3.value;

          _circle.update(this.circles);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.particles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var particle = _step4.value;

          if (particle.alpha <= 0) {
            this.particles.splice(particle, 1);
            continue;
          }

          particle.render();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return Circles;
}(_src.Canvas);

new Circles();
},{"../../src":"../src/index.js","../classes/Particle":"classes/Particle.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64374" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","src/4.js"], null)
//# sourceMappingURL=/4.0f04ea2b.js.map