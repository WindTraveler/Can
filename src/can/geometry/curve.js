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

class Curve extends Geometry{
    constructor(options, parent) {
        super(options, parent);
    }
}

// 继承原型链
var proto = Curve.prototype;

// 实现圆形自己的draw接口
proto.draw = function (ctx) {
    var pts = this.points || [];
    var len = pts.length;

    if (len >= 6 && len % 2 === 0) {
        // 二次贝塞尔或是三次贝塞尔
        // 起始点 + 控制点（1-2个）+ 结束点
        var funName = len === 6 ? 'quadraticCurveTo' : 'bezierCurveTo';
        ctx.moveTo(pts[0], pts[1]);
        ctx[funName].apply(ctx, pts.slice(2));

        if (this.closed) {
            ctx.closePath();
        }
    }
    else {
        throw new Error('请传入三个或四个点的数据');
    }
};

export default Curve;
