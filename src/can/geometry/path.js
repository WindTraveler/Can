/**
 * 图形库-直线、折线
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');

const Utils = require('../utils/utils');

import Geometry from './geom';

/**
 * 直线必填属性
 *
 * @param points []
 * @
 */

class Path extends Geometry{
    constructor(options, parent) {
        super(options, parent);
    }
}

// 继承原型链
var proto = Path.prototype;

// 实现圆形自己的draw接口
proto.draw = function (ctx) {
    var pts = this.points || [];
    var len = pts.length;

    if (len >= 4 && len % 2 === 0) {
        for (let i = 0; i < len; i += 2) {
            ctx[ i === 0 ? 'moveTo' : 'lineTo'](pts[i], pts[i + 1]);
        }
        if (this.closed) {
            ctx.closePath();
        }
    }
    else {
        throw new Error('至少需要传入2个点');
    }
};

export default Path;
