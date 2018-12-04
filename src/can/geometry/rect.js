/**
 * 图形库-矩形
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');
const Gemo = require('./geom');
const Events = require('../events');

function Rect(options) {
    Gemo.call(this, options);
}

// 继承原型链
var proto = Rect.prototype = Object.create(Gemo.prototype);
proto.constructor = Rect;

// 矩形自己的绘制方法
proto.draw = function (ctx) {
    ctx.rect(this.x, this.y, this.width, this.height);
};

module.exports = Rect;