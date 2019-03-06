'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __ = {
  poolDic: Symbol('poolDic')

  /**
   * 简易的对象池实现
   * 用于对象的存贮和重复使用
   * 可以有效减少对象创建开销和避免频繁的垃圾回收
   * 提高游戏性能
   */
};
var Pool = function () {
  function Pool() {
    _classCallCheck(this, Pool);

    this[__.poolDic] = {};
  }

  /**
   * 根据对象标识符
   * 获取对应的对象池
   */


  _createClass(Pool, [{
    key: 'getPoolBySign',
    value: function getPoolBySign(name) {
      return this[__.poolDic][name] || (this[__.poolDic][name] = []);
    }

    /**
     * 根据传入的对象标识符，查询对象池
     * 对象池为空创建新的类，否则从对象池中取
     */

  }, {
    key: 'getItemByClass',
    value: function getItemByClass(name, className) {
      var pool = this.getPoolBySign(name);

      var result = pool.length ? pool.shift() : new className();

      return result;
    }

    /**
     * 将对象回收到对象池
     * 方便后续继续使用
     */

  }, {
    key: 'recover',
    value: function recover(name, instance) {
      this.getPoolBySign(name).push(instance);
    }
  }]);

  return Pool;
}();

exports.default = Pool;