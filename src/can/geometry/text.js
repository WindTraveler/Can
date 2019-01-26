import Rect from "./rect";

/**
 * 图形库-文字
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');
import Geometry from './geom';
const Utils = require('../utils/utils');

/**
 * 文字的必填属性
 *
 * @param options
 * @param options.x
 * @param options.y
 * @param options.value 文字内容
 */
// function Text(options) {
//     // Gemo.call(this, options);
// }
class Text extends Geometry{
    constructor(options, parent) {
        super(options, parent);
    }
}

// 继承原型链
var proto = Text.prototype;
// proto.constructor = Text;

// 实现圆形自己的draw接口
proto.draw = function (ctx) {
    ctx.strokeText(this.value, this.x, this.y);
    ctx.fillText(this.value, this.x, this.y);
};

proto.preDraw = function (ctx) {
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.fillStyle = this.fs;
    ctx.strokeStyle = this.ss;
};

proto.postDraw = function (ctx) {
    return ;
};

export default Text;
