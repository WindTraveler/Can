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

/**
 * 获取data对象
 *
 * @param obj
 */
function retrieveData(obj) {
    if (obj) {
        var data = typeof obj === 'function' ? obj() : obj || {};
        return data;
    }
    return {};
}

class Geometry {
    constructor(options, parent) {
        var options = options || {};
        var data = retrieveData(options.data);
        var parentData = {};

        // 如果是组件内子图型
        if (parent) {
            parentData = retrieveData(parent.$data);
        }

        this.$options = options;
        // defaults是所有canvas绘画时，可能会涉及到的属性
        this.$data = _.defaults(data, parentData, this.defaults);

        this.id = _.uniqueId('geom_');

        // 设置响应式属性
        // fixme 取消子元素的响应式属性真的好嘛？
        if (!parent) {
            observe(this.$data, this.fireRepaint.bind(this));
        }

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
                // that.trigger('repaint');
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

    // 子元素f、s之后，清空path，避免父组件的postDraw影响颜色
    ctx.beginPath();
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

    console.log(this, this.ss);
    // ctx.beginPath();
}

proto.postDraw = function (ctx) {
    ctx.fill();
    ctx.stroke();
    // ctx.restore();
}

/**
 * 触发重绘事件
 */
proto.fireRepaint = function () {
    this.trigger('repaint');
}

export default Geometry;
