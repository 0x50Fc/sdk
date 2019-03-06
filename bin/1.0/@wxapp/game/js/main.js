'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./player/index');

var _index2 = _interopRequireDefault(_index);

var _enemy = require('./npc/enemy');

var _enemy2 = _interopRequireDefault(_enemy);

var _background = require('./runtime/background');

var _background2 = _interopRequireDefault(_background);

var _gameinfo = require('./runtime/gameinfo');

var _gameinfo2 = _interopRequireDefault(_gameinfo);

var _music = require('./runtime/music');

var _music2 = _interopRequireDefault(_music);

var _databus = require('./databus');

var _databus2 = _interopRequireDefault(_databus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ctx = canvas.getContext('2d');
var databus = new _databus2.default();

/**
 * 游戏主函数
 */

var Main = function () {
  function Main() {
    _classCallCheck(this, Main);

    // 维护当前requestAnimationFrame的id
    this.aniId = 0;

    this.restart();
  }

  _createClass(Main, [{
    key: 'restart',
    value: function restart() {
      databus.reset();

      canvas.removeEventListener('touchstart', this.touchHandler);

      this.bg = new _background2.default(ctx);
      this.player = new _index2.default(ctx);
      this.gameinfo = new _gameinfo2.default();
      this.music = new _music2.default();

      this.bindLoop = this.loop.bind(this);
      this.hasEventBind = false;

      // 清除上一局的动画
      window.cancelAnimationFrame(this.aniId);

      this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
    }

    /**
     * 随着帧数变化的敌机生成逻辑
     * 帧数取模定义成生成的频率
     */

  }, {
    key: 'enemyGenerate',
    value: function enemyGenerate() {
      if (databus.frame % 30 === 0) {
        var enemy = databus.pool.getItemByClass('enemy', _enemy2.default);
        enemy.init(6);
        databus.enemys.push(enemy);
      }
    }

    // 全局碰撞检测

  }, {
    key: 'collisionDetection',
    value: function collisionDetection() {
      var that = this;

      databus.bullets.forEach(function (bullet) {
        for (var i = 0, il = databus.enemys.length; i < il; i++) {
          var enemy = databus.enemys[i];

          if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
            enemy.playAnimation();
            that.music.playExplosion();

            bullet.visible = false;
            databus.score += 1;

            break;
          }
        }
      });

      for (var i = 0, il = databus.enemys.length; i < il; i++) {
        var enemy = databus.enemys[i];

        if (this.player.isCollideWith(enemy)) {
          databus.gameOver = true;

          break;
        }
      }
    }

    // 游戏结束后的触摸事件处理逻辑

  }, {
    key: 'touchEventHandler',
    value: function touchEventHandler(e) {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      var area = this.gameinfo.btnArea;

      if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) this.restart();
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */

  }, {
    key: 'render',
    value: function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.bg.render(ctx);

      databus.bullets.concat(databus.enemys).forEach(function (item) {
        item.drawToCanvas(ctx);
      });

      this.player.drawToCanvas(ctx);

      databus.animations.forEach(function (ani) {
        if (ani.isPlaying) {
          ani.aniRender(ctx);
        }
      });

      this.gameinfo.renderGameScore(ctx, databus.score);

      // 游戏结束停止帧循环
      if (databus.gameOver) {
        this.gameinfo.renderGameOver(ctx, databus.score);

        if (!this.hasEventBind) {
          this.hasEventBind = true;
          this.touchHandler = this.touchEventHandler.bind(this);
          canvas.addEventListener('touchstart', this.touchHandler);
        }
      }
    }

    // 游戏逻辑更新主函数

  }, {
    key: 'update',
    value: function update() {
      if (databus.gameOver) return;

      this.bg.update();

      databus.bullets.concat(databus.enemys).forEach(function (item) {
        item.update();
      });

      this.enemyGenerate();

      this.collisionDetection();

      if (databus.frame % 20 === 0) {
        this.player.shoot();
        this.music.playShoot();
      }
    }

    // 实现游戏帧循环

  }, {
    key: 'loop',
    value: function loop() {
      databus.frame++;

      this.update();
      this.render();

      this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
    }
  }]);

  return Main;
}();

exports.default = Main;