import Rect from "./rect";

/**
 * 图形库-正多边形
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');
import Geometry from './geom';
const Utils = require('../utils/utils');

/**
 * 多边形的必填属性
 *
 * @param options
 * @param options.x
 * @param options.y
 * @param options.r 半径
 * @param options.sides 边数
 */
// function Poly(options) {
//     // Gemo.call(this, options);
// }
class Poly extends Geometry{
    constructor(options) {
        super(options);
    }
}

// 继承原型链
var proto = Poly.prototype;
// proto.constructor = Poly;

// 定义一个Point类
var Point = function (x, y) {
    this.x = x;
    this.y = y;
};

proto.getPoints = function () {
    var points = [],
        angle = this.startAngle || 0;

    for (var i=0; i < this.sides; ++i) {
        points.push(new Point(this.x + this.r * Math.sin(angle),
            this.y - this.r * Math.cos(angle)));
        angle += 2*Math.PI/this.sides;
    }
    return points;
};

// 实现draw接口
proto.draw = function (ctx) {
    var points = this.getPoints();

    ctx.moveTo(points[0].x, points[0].y);

    for (var i=1; i < this.sides; ++i) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();
};

export default Poly;
