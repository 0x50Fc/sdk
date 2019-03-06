'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _databus = require('../databus');

var _databus2 = _interopRequireDefault(_databus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var databus = new _databus2.default();

var __ = {
  timer: Symbol('timer')

  /**
   * 简易的帧动画类实现
   */
};
var Animation = function (_Sprite) {
  _inherits(Animation, _Sprite);

  function Animation(imgSrc, width, height) {
    _classCallCheck(this, Animation);

    // 当前动画是否播放中
    var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this, imgSrc, width, height));

    _this.isPlaying = false;

    // 动画是否需要循环播放
    _this.loop = false;

    // 每一帧的时间间隔
    _this.interval = 1000 / 60;

    // 帧定时器
    _this[__.timer] = null;

    // 当前播放的帧
    _this.index = -1;

    // 总帧数
    _this.count = 0;

    // 帧图片集合
    _this.imgList = [];

    /**
     * 推入到全局动画池里面
     * 便于全局绘图的时候遍历和绘制当前动画帧
     */
    databus.animations.push(_this);
    return _this;
  }

  /**
   * 初始化帧动画的所有帧
   * 为了简单，只支持一个帧动画
   */


  _createClass(Animation, [{
    key: 'initFrames',
    value: function initFrames(imgList) {
      var _this2 = this;

      imgList.forEach(function (imgSrc) {
        var img = new Image();
        img.src = imgSrc;

        _this2.imgList.push(img);
      });

      this.count = imgList.length;
    }

    // 将播放中的帧绘制到canvas上

  }, {
    key: 'aniRender',
    value: function aniRender(ctx) {
      ctx.drawImage(this.imgList[this.index], this.x, this.y, this.width * 1.2, this.height * 1.2);
    }

    // 播放预定的帧动画

  }, {
    key: 'playAnimation',
    value: function playAnimation() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // 动画播放的时候精灵图不再展示，播放帧动画的具体帧
      this.visible = false;

      this.isPlaying = true;
      this.loop = loop;

      this.index = index;

      if (this.interval > 0 && this.count) {
        this[__.timer] = setInterval(this.frameLoop.bind(this), this.interval);
      }
    }

    // 停止帧动画播放

  }, {
    key: 'stop',
    value: function stop() {
      this.isPlaying = false;

      if (this[__.timer]) clearInterval(this[__.timer]);
    }

    // 帧遍历

  }, {
    key: 'frameLoop',
    value: function frameLoop() {
      this.index++;

      if (this.index > this.count - 1) {
        if (this.loop) {
          this.index = 0;
        } else {
          this.index--;
          this.stop();
        }
      }
    }
  }]);

  return Animation;
}(_sprite2.default);

exports.default = Animation;