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
},{"./Calc":"../src/Calc.js","./Canvas":"../src/Canvas.js","./Vector":"../src/Vector.js"}],"src/5.js":[function(require,module,exports) {
"use strict";

var _src = require("../../src");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bob =
/*#__PURE__*/
function () {
  function Bob(ms, r, a) {
    _classCallCheck(this, Bob);

    this.ms = ms;
    this.r = r;
    this.a = a;
  }

  _createClass(Bob, [{
    key: "render",
    value: function render() {
      var ms = this.ms,
          r = this.r,
          a = this.a;
      var x = r * Math.cos(a);
      var y = r * Math.sin(a);
      ms.line({
        x1: 0,
        y1: 0,
        x2: x,
        y2: y
      });
      ms.arc({
        x: x,
        y: y,
        r: 30,
        color: '#fff'
      });
    }
  }]);

  return Bob;
}();

var Pendulum =
/*#__PURE__*/
function (_Canvas) {
  _inherits(Pendulum, _Canvas);

  function Pendulum() {
    var _this;

    _classCallCheck(this, Pendulum);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pendulum).call(this, {
      fps: 60,
      bgColor: 'rgb(50, 50, 50)',
      width: window.innerWidth,
      height: window.innerHeight
    }));
    _this.angle = Math.PI / 4;
    _this.radius = 150;
    _this._velocity = 0.01;
    _this.acceleration = 0.001;
    _this.max_velocity = 0.5;
    _this.amplitude = 360;
    _this.period = 200;
    _this.bob = new Bob(_assertThisInitialized(_this), _this.radius, _this.angle);

    _this.init();

    return _this;
  }

  _createClass(Pendulum, [{
    key: "bg",
    value: function bg() {
      var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
      grd.addColorStop(0, "#1f3342");
      grd.addColorStop(1, "black");
      this.ctx.fillStyle = grd;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "render",
    value: function render(time) {
      this.bg();
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2); // this.bob.render()
      // this.angle += this.velocity
      // this.velocity += this.acceleration
      // this.bob.a = this.angle

      var x = this.amplitude * Math.sin(time / this.period);
      this.arc({
        x: x,
        y: 0,
        r: 30,
        color: '#fff'
      });
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }, {
    key: "velocity",
    set: function set(velocity) {
      this._velocity = velocity > this.max_velocity ? this.max_velocity : velocity;
    },
    get: function get() {
      return this._velocity;
    }
  }]);

  return Pendulum;
}(_src.Canvas);

new Pendulum();
},{"../../src":"../src/index.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","src/5.js"], null)
//# sourceMappingURL=/5.39ed9e06.js.map