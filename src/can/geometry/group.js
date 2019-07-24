const _ = require('underscore');
const Events = require('../events');
import {Circle, Rect, Img, Text, Poly, Geometry} from './index';

// 命名空间
function Group(context) {
    if (!context) throw new Error('context is invalid!');

    this.canvas = context.canvas;
    this.context = context;
    this.geometries = [];
};

const proto = Group.prototype;

_.extend(proto, Events);

var time = 0;
/**
 * 将队列中的图形全部绘制
 */
proto.paint = function () {
    const ctx = this.context;
    const geometries = this.geometries;

    this.clear();
    // console.log('绘制次数', ++time);
    geometries.forEach(geom => {
        geom.paint(ctx);
    });
};

/**
 * 清除画布
 */
proto.clear = function () {
    const {width: w, height: h} = this.canvas;
    const ctx = this.context;

    ctx.clearRect(0, 0, w, h);
}

/**
 * 添加一个图形
 */
proto.add = function (type, opts) {
    var Factory = null;
    var geom = null;

    if (Array.isArray(type)) {
        // 图形对象数组
        type.forEach(geom => {
            this.add(geom);
        });
        return type;
    }
    else if (type instanceof Geometry) {
        // 如果是图形对象
        geom = type;
    }
    else if (typeof type === 'string' && GEOM_MAP.has(type)) {
        Factory = GEOM_MAP.get(type);
        geom = new Factory(opts);
    }
    else {
        throw new TypeError(type + '是未被定义的图形类型');
        // console.error(type + '是未被定义的图形类型');
    }

    // const geom = new Factory(opts);
    this.geometries.push(geom);

    // 监听
    // 未优化
    // this.listenTo(geom, 'repaint', this.paint);
    // 优化
    this.listenTo(geom, 'repaint', this.batchPaint);

    //添加之后立即重绘
    // this.paint();
    this.batchPaint();

    return geom;
};

var timeId = null;

proto.batchPaint = function() {
    if (timeId === null) {
        // timeId = setTimeout(() => {
        //     this.paint();
        //     timeId = null;
        // }, 0);
        timeId = requestAnimationFrame(() => {
            this.paint();
            timeId = null;
        });
    }
};

/**
 *  删除一个图形
 */
proto.remove = function (geometry) {
    if (!geometry) return;

    var index = this.geometries.findIndex(gemo => {
        return gemo.id === geometry.id;
    });

    if (index > -1) {
        geometry.off('repaint');
        this.geometries.splice(index, 1);
    }

    //重绘
    this.batchPaint();

    return geometry;
}

/**
 * 删除全部图形
 */
proto.destory = function () {
    var copy = this.geometries.slice();

    this.geometries.forEach(geom => {
        geom.off('repaint');
    });
    this.geometries = [];
    this.clear();

    return copy;
}

export default Group;

