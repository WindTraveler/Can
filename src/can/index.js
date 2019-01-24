const _ = require('underscore');
const Events = require('./events');
import { Circle, Rect, Img, Text, Poly} from './geometry/index';
import Group from './geometry/group';

// 命名空间
function Can(context) {
    if (!context) throw new Error('context is invalid!');

    this.canvas = context.canvas;
    this.context = context;

    this.geometries = [];

    // 根节点
    this.root = new Group(context);
};

const proto = Can.prototype;

_.extend(proto, Events);

/**
 * 将队列中的图形全部绘制
 */
proto.paint = function () {
    this.root.paint();
};

/**
 * 清除画布
 */
proto.clear = function () {
    this.root.clear();
}

/**
 * 添加一个图形
 */
proto.add = function (type, opts) {
    return this.root.add(type, opts);
};

/**
 *  删除一个图形
 */
proto.remove = function (geometry) {
    return this.root.remove(geometry);
}

export default Can;
