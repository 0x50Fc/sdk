"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var atlas = new Image();
atlas.src = 'images/Common.png';

var GameInfo = function () {
  function GameInfo() {
    _classCallCheck(this, GameInfo);
  }

  _createClass(GameInfo, [{
    key: "renderGameScore",
    value: function renderGameScore(ctx, score) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Arial";

      ctx.fillText(score, 10, 30);
    }
  }, {
    key: "renderGameOver",
    value: function renderGameOver(ctx, score) {
      ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);

      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Arial";

      ctx.fillText('游戏结束', screenWidth / 2 - 40, screenHeight / 2 - 100 + 50);

      ctx.fillText('得分: ' + score, screenWidth / 2 - 40, screenHeight / 2 - 100 + 130);

      ctx.drawImage(atlas, 120, 6, 39, 24, screenWidth / 2 - 60, screenHeight / 2 - 100 + 180, 120, 40);

      ctx.fillText('重新开始', screenWidth / 2 - 40, screenHeight / 2 - 100 + 205);

      /**
       * 重新开始按钮区域
       * 方便简易判断按钮点击
       */
      this.btnArea = {
        startX: screenWidth / 2 - 40,
        startY: screenHeight / 2 - 100 + 180,
        endX: screenWidth / 2 + 50,
        endY: screenHeight / 2 - 100 + 255
      };
    }
  }]);

  return GameInfo;
}();

exports.default = GameInfo;