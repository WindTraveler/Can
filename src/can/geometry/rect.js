/**
 * 图形库-矩形
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');
import Geometry from './geom';
const Events = require('../events');

// function Rect(options) {
//     // Gemo.call(this, options);
// }
class Rect extends Geometry{
    constructor(options, parent) {
        super(options, parent);
    }
}

// 继承原型链
var proto = Rect.prototype;
// proto.constructor = Rect;

// 矩形自己的绘制方法
proto.draw = function (ctx) {
    ctx.rect(+this.x, +this.y, +this.width, +this.height);
};

export default Rect;
