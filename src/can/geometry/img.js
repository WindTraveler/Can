import Rect from "./rect";

/**
 * 图形库-模板
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');
import Geometry from './geom';
const Utils = require('../utils/utils');

// function Img(options) {
//     // Gemo.call(this, options);
// }

class Img extends Geometry{
    constructor(options) {
        super(options);
    }
}

// 继承原型链
var proto = Img.prototype;
// var proto = Img.prototype = Object.create(Geometry.prototype);
// proto.constructor = Img;

// 实现圆形自己的draw接口
proto.draw = function (ctx) {
    var img = new Image();
    var that = this;

    img.src = this.src;

    img.addEventListener('load', () => {
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    });
};

export default Img;
