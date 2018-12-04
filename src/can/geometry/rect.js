const _ = require('underscore');
const Events = require('../events');
const Utils = require('../utils/utils');

function Rect(options) {
    var options = _.defaults(options, this.defaults);

    this._id = _.uniqueId('gem_');

    // 定义属性
    Utils.assignPropsAndMethods(this, options);
}

const proto = Rect.prototype;

_.extend(proto, Events, {
    defaults: {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        fs: 'transparent',
        ss: 'black'
    }
});

proto.paint = function (ctx) {
    this.preDraw(ctx);
    this.draw(ctx);
    this.postDraw(ctx);
};

// 矩形自己的绘制方法
proto.draw = function (ctx) {
    ctx.rect(this.x, this.y, this.width, this.height);
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

module.exports = Rect;