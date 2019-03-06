'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animation = require('../base/animation');

var _animation2 = _interopRequireDefault(_animation);

var _databus = require('../databus');

var _databus2 = _interopRequireDefault(_databus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENEMY_IMG_SRC = 'images/enemy.png';
var ENEMY_WIDTH = 60;
var ENEMY_HEIGHT = 60;

var __ = {
  speed: Symbol('speed')
};

var databus = new _databus2.default();

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

var Enemy = function (_Animation) {
  _inherits(Enemy, _Animation);

  function Enemy() {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT));

    _this.initExplosionAnimation();
    return _this;
  }

  _createClass(Enemy, [{
    key: 'init',
    value: function init(speed) {
      this.x = rnd(0, window.innerWidth - ENEMY_WIDTH);
      this.y = -this.height;

      this[__.speed] = speed;

      this.visible = true;
    }

    // 预定义爆炸的帧动画

  }, {
    key: 'initExplosionAnimation',
    value: function initExplosionAnimation() {
      var frames = [];

      var EXPLO_IMG_PREFIX = 'images/explosion';
      var EXPLO_FRAME_COUNT = 19;

      for (var i = 0; i < EXPLO_FRAME_COUNT; i++) {
        frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png');
      }

      this.initFrames(frames);
    }

    // 每一帧更新子弹位置

  }, {
    key: 'update',
    value: function update() {
      this.y += this[__.speed];

      // 对象回收
      if (this.y > window.innerHeight + this.height) databus.removeEnemey(this);
    }
  }]);

  return Enemy;
}(_animation2.default);

exports.default = Enemy;