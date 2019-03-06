'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = require('../base/sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var BG_IMG_SRC = 'images/bg.jpg';
var BG_WIDTH = 512;
var BG_HEIGHT = 512;

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */

var BackGround = function (_Sprite) {
  _inherits(BackGround, _Sprite);

  function BackGround(ctx) {
    _classCallCheck(this, BackGround);

    var _this = _possibleConstructorReturn(this, (BackGround.__proto__ || Object.getPrototypeOf(BackGround)).call(this, BG_IMG_SRC, BG_WIDTH, BG_HEIGHT));

    _this.top = 0;

    _this.render(ctx);
    return _this;
  }

  _createClass(BackGround, [{
    key: 'update',
    value: function update() {
      this.top += 2;

      if (this.top >= screenHeight) this.top = 0;
    }

    /**
     * 背景图重绘函数
     * 绘制两张图片，两张图片大小和屏幕一致
     * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
     * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
     */

  }, {
    key: 'render',
    value: function render(ctx) {
      ctx.drawImage(this.img, 0, 0, this.width, this.height, 0, -screenHeight + this.top, screenWidth, screenHeight);

      ctx.drawImage(this.img, 0, 0, this.width, this.height, 0, this.top, screenWidth, screenHeight);
    }
  }]);

  return BackGround;
}(_sprite2.default);

exports.default = BackGround;