'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = void 0;

/**
 * 统一的音效管理器
 */

var Music = function () {
  function Music() {
    _classCallCheck(this, Music);

    if (instance) return instance;

    instance = this;

    this.bgmAudio = new Audio();
    this.bgmAudio.loop = true;
    this.bgmAudio.src = 'audio/bgm.mp3';

    this.shootAudio = new Audio();
    this.shootAudio.src = 'audio/bullet.mp3';

    this.boomAudio = new Audio();
    this.boomAudio.src = 'audio/boom.mp3';

    this.playBgm();
  }

  _createClass(Music, [{
    key: 'playBgm',
    value: function playBgm() {
      this.bgmAudio.play();
    }
  }, {
    key: 'playShoot',
    value: function playShoot() {
      this.shootAudio.currentTime = 0;
      this.shootAudio.play();
    }
  }, {
    key: 'playExplosion',
    value: function playExplosion() {
      this.boomAudio.currentTime = 0;
      this.boomAudio.play();
    }
  }]);

  return Music;
}();

exports.default = Music;