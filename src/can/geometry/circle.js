/**
 * 图形库-圆形
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');

const Utils = require('../utils/utils');

import Geometry from './geom';

// function Circle(options) {
//     Gemo.call(this, options);
// }

class Circle extends Geometry{
    constructor(options, parent) {
        super(options, parent);
    }
}

// 继承原型链
var proto = Circle.prototype;
// var proto = Circle.prototype = Object.create(Gemo.prototype);
// proto.constructor = Circle;

// 实现圆形自己的draw接口
proto.draw = function (ctx) {
    ctx.arc(+this.x, +this.y, +this.r, 0, 2 * Math.PI);
};

proto.translate = function (x, y) {
    this.x += x;
    this.y += y;
}

// module.exports = Circle;
export default Circle;
