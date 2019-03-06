'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 游戏基础的精灵类
 */
var Sprite = function () {
  function Sprite() {
    var imgSrc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, Sprite);

    this.img = new Image();
    this.img.src = imgSrc;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.visible = true;
  }

  /**
   * 将精灵图绘制在canvas上
   */


  _createClass(Sprite, [{
    key: 'drawToCanvas',
    value: function drawToCanvas(ctx) {
      if (!this.visible) return;

      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * 简单的碰撞检测定义：
     * 另一个精灵的中心点处于本精灵所在的矩形内即可
     * @param{Sprite} sp: Sptite的实例
     */

  }, {
    key: 'isCollideWith',
    value: function isCollideWith(sp) {
      var spX = sp.x + sp.width / 2;
      var spY = sp.y + sp.height / 2;

      if (!this.visible || !sp.visible) return false;

      return !!(spX >= this.x && spX <= this.x + this.width && spY >= this.y && spY <= this.y + this.height);
    }
  }]);

  return Sprite;
}();

exports.default = Sprite;