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

// 上下文的默认属性
const ctxDefaults = {
    fs: 'transparent',
    ss: 'transparent',
    lineWidth: 1,
    lineCap: 'butt', // round square
    lineJoin: 'miter', //round bevel
    alpha: 1,
    textAlign: 'start', // left right center start end
    textBaseline: 'alphabetic', // top hanging middle alphabetic ideographic bottom,
    shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowX: 0,
    shadowY: 0
};

// 上下文状态和属性简写之间的映射
const nameMap = {
    fillStyle: 'fs',
    strokeStyle: 'ss',
    globalAlpha: 'alpha',
    lineWidth: 'lineWidth',
    lineCap: 'lineCap',
    lineJoin: 'lineJoin',
    shadowBlur: 'shadowBlur',
    shadowColor: 'shadowColor',
    shadowOffsetX: 'shadowX',
    shadowOffsetY: 'shadowY'
};

_.extend(proto, Events, {
    defaults: {
        x: 0,
        y: 0,
        r: CONST_FOR_SIZE,
        width: CONST_FOR_SIZE,
        height: CONST_FOR_SIZE,
        fontSize: 10,
        font: 'sans-serif',
        closed: false,
        points: [],
        ...ctxDefaults
    }
});

proto.paint = function (ctx) {
    // ctx.save();
    // 设置样式
    this.preDraw(ctx);
    // 开始新的路径
    ctx.beginPath();
    this.draw(ctx);
    this.postDraw(ctx);

    // 子元素f、s之后，清空path，避免父组件的postDraw影响颜色
    ctx.beginPath();
    // ctx.restore();
};

// 圆形自己的绘制方法
proto.draw = function (ctx) {
    console.log('来自Gemo的draw方法');
};

proto.preDraw = function (ctx) {
    // Object.keys(nameMap).forEach(key => {
    //     if (ctx[key] !== this[nameMap[key]]) {
    //         ctx[key] = this[nameMap[key]];
    //     }
    // });

    // for (var key in nameMap) {
    //     if (ctx[key] !== this[nameMap[key]]) {
    //         ctx[key] = this[nameMap[key]];
    //     }
    // }

    ctx.fillStyle = this.fs;
    ctx.strokeStyle = this.ss;
    ctx.globalAlpha = this.alpha;
    
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;
    
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOffsetX = this.shadowX;
    ctx.shadowOffsetY = this.shadowY;

    // 【重要】【重要】【重要】
    // 这句代码严重的影响页面渲染性能
    // console.log(this);
}

proto.postDraw = function (ctx) {
    if (this.fs !== 'transparent') {
        ctx.fill();
    }
    if (this.ss !== 'transparent') {
        ctx.stroke();
    }
}

/**
 * 触发重绘事件
 */
proto.fireRepaint = function () {
    this.trigger('repaint');
}

export default Geometry;
