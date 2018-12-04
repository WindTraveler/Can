const _ = require('underscore');
const Events = require('../events');
const Utils = require('../utils/utils');

function Gemo(options) {
    var options = _.defaults(options, this.defaults);

    this.id = _.uniqueId('geom_');

    // 定义属性
    Utils.assignPropsAndMethods(this, options);
}

const proto = Gemo.prototype;
const CONST_FOR_SIZE = 20;

_.extend(proto, Events, {
    defaults: {
        x: 0,
        y: 0,
        r: CONST_FOR_SIZE,
        width: CONST_FOR_SIZE,
        height: CONST_FOR_SIZE,
        fs: 'transparent',
        ss: 'black'
    }
});

proto.paint = function (ctx) {
    this.preDraw(ctx);
    this.draw(ctx);
    this.postDraw(ctx);
};

// 圆形自己的绘制方法
proto.draw = function (ctx) {
    console.log('来自Gemo的draw方法');
};

proto.preDraw = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.fs;
    ctx.strokeStyle = this.ss;
    ctx.beginPath();
}

proto.postDraw = function (ctx) {
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

module.exports = Gemo;