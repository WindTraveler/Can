const _ = require('underscore');
const Events = require('./events');
const Circle = require('./geometry/circle');
const Rect = require('./geometry/rect');
const Poly = require('./geometry/poly');
const Text = require('./geometry/text');

// 命名空间
function Can(context) {
    if (!context) throw new Error('context is invalid!');

    this.canvas = context.canvas;
    this.context = context;
    this.geometries = [];
};

const proto = Can.prototype;

_.extend(proto, Events);

/**
 * 将队列中的图形全部绘制
 */
proto.paint = function () {
    const ctx = this.context;
    const geometries = this.geometries;
    
    this.clear();

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
    // todo 先添加圆形
    var Factory = null;

    switch (type) {
        case 'circle':
            Factory = Circle;
            break;
        case 'rect':
            Factory = Rect;
            break;
        case 'poly':
            Factory = Poly;
            break;
        case 'text':
            Factory = Text;
            break;
        default:
            throw new TypeError('目前并没有该绘制种类：' + type);
    }

    const geom = new Factory(opts);
    this.geometries.push(geom);

    // 监听
    this.listenTo(geom, 'repaint', this.paint);

    return geom;
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
        this.geometries.splice(index, 1);
    }

    return geometry;
}

export default Can;
