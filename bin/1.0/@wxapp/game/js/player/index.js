'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = require('../base/sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _bullet = require('./bullet');

var _bullet2 = _interopRequireDefault(_bullet);

var _databus = require('../databus');

var _databus2 = _interopRequireDefault(_databus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// 玩家相关常量设置
var PLAYER_IMG_SRC = 'images/hero.png';
var PLAYER_WIDTH = 80;
var PLAYER_HEIGHT = 80;

var databus = new _databus2.default();

var Player = function (_Sprite) {
  _inherits(Player, _Sprite);

  function Player() {
    _classCallCheck(this, Player);

    // 玩家默认处于屏幕底部居中位置
    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT));

    _this.x = screenWidth / 2 - _this.width / 2;
    _this.y = screenHeight - _this.height - 30;

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    _this.touched = false;

    _this.bullets = [];

    // 初始化事件监听
    _this.initEvent();
    return _this;
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */


  _createClass(Player, [{
    key: 'checkIsFingerOnAir',
    value: function checkIsFingerOnAir(x, y) {
      var deviation = 30;

      return !!(x >= this.x - deviation && y >= this.y - deviation && x <= this.x + this.width + deviation && y <= this.y + this.height + deviation);
    }

    /**
     * 根据手指的位置设置飞机的位置
     * 保证手指处于飞机中间
     * 同时限定飞机的活动范围限制在屏幕中
     */

  }, {
    key: 'setAirPosAcrossFingerPosZ',
    value: function setAirPosAcrossFingerPosZ(x, y) {
      var disX = x - this.width / 2;
      var disY = y - this.height / 2;

      if (disX < 0) disX = 0;else if (disX > screenWidth - this.width) disX = screenWidth - this.width;

      if (disY <= 0) disY = 0;else if (disY > screenHeight - this.height) disY = screenHeight - this.height;

      this.x = disX;
      this.y = disY;
    }

    /**
     * 玩家响应手指的触摸事件
     * 改变战机的位置
     */

  }, {
    key: 'initEvent',
    value: function initEvent() {
      var _this2 = this;

      canvas.addEventListener('touchstart', function (e) {
        e.preventDefault();

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        //
        if (_this2.checkIsFingerOnAir(x, y)) {
          _this2.touched = true;

          _this2.setAirPosAcrossFingerPosZ(x, y);
        }
      }.bind(this));

      canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        if (_this2.touched) _this2.setAirPosAcrossFingerPosZ(x, y);
      }.bind(this));

      canvas.addEventListener('touchend', function (e) {
        e.preventDefault();

        _this2.touched = false;
      }.bind(this));
    }

    /**
     * 玩家射击操作
     * 射击时机由外部决定
     */

  }, {
    key: 'shoot',
    value: function shoot() {
      var bullet = databus.pool.getItemByClass('bullet', _bullet2.default);

      bullet.init(this.x + this.width / 2 - bullet.width / 2, this.y - 10, 10);

      databus.bullets.push(bullet);
    }
  }]);

  return Player;
}(_sprite2.default);

exports.default = Player;