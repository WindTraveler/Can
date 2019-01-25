/**
 * 图形库-基类
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */
const _ = require('underscore');
const Events = require('../events');
const Utils = require('../utils/utils');
import { observe } from '../observer/index'

// function Gemo(options) {
//     var options = _.defaults(options, this.defaults);
//
//     this.id = _.uniqueId('geom_');
//
//     // 定义属性
//     Utils.assignPropsAndMethods(this, options);
// }

class Geometry {
    constructor(options) {
        var options = options || {};
        var data = typeof options.data === 'function' ? options.data() : options.data;

        this.$options = options;
        // defaults是所有canvas绘画时，可能会涉及到的属性
        this.$data = _.defaults((data || {}), this.defaults);

        this.id = _.uniqueId('geom_');

        // 设置响应式属性
        observe(this.$data);

        // 代理
        _proxy.call(this, this.$data);
    }
}

/**
 * 代理
 *
 * @param val
 * @private
 */
function _proxy(data) {
    var that = this;

    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            enumerable: true,
            configurable: true,
            get() {
                return that.$data[key];
            },
            set(newVal) {
                that.$data[key] = newVal;

                // fixme 暂时在这里触发重绘
                that.trigger('repaint');
            }
        })
    })
}

const proto = Geometry.prototype;
const CONST_FOR_SIZE = 20;

_.extend(proto, Events, {
    defaults: {
        x: 0,
        y: 0,
        r: CONST_FOR_SIZE,
        width: CONST_FOR_SIZE,
        height: CONST_FOR_SIZE,
        fs: 'transparent',
        ss: 'black',
        font: 'sans-serif',
        fontSize: 15
    }
});

proto.paint = function (ctx) {
    ctx.save();
    // 设置样式
    this.preDraw(ctx);
    // 开始新的路径
    ctx.beginPath();
    this.draw(ctx);
    this.postDraw(ctx);
    ctx.restore();
};

// 圆形自己的绘制方法
proto.draw = function (ctx) {
    console.log('来自Gemo的draw方法');
};

proto.preDraw = function (ctx) {
    // ctx.save();
    ctx.fillStyle = this.fs;
    ctx.strokeStyle = this.ss;
    // ctx.beginPath();
}

proto.postDraw = function (ctx) {
    ctx.fill();
    ctx.stroke();
    // ctx.restore();
}

export default Geometry;
