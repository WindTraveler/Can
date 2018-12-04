/**
 * 图形库-模板
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

const _ = require('underscore');
const Gemo = require('./geom');
const Utils = require('../utils/utils');

function F(options) {
    Gemo.call(this, options);
}

// 继承原型链
var proto = F.prototype = Object.create(Gemo.prototype);
proto.constructor = F;

// 实现圆形自己的draw接口
proto.draw = function (ctx) {
    
};

module.exports = F;