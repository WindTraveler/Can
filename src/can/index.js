const _ = require('underscore');
const Events = require('./events');
import {Circle, Geometry} from './geometry/index';
import Group from './geometry/group';
import {parseHTML, generate} from "./compiler";

// 命名空间
function Can(context) {
    if (!context) throw new Error('context is invalid!');

    this.canvas = context.canvas;
    this.context = context;

    // this.geometries = [];

    // 根节点
    this.root = new Group(context);
};

const proto = Can.prototype;

_.extend(proto, Events);

/**
 * 将队列中的图形全部绘制
 */
proto.paint = function () {
    this.clear();

    this.root.paint();
};

/**
 * 清除画布
 */
proto.clear = function () {
    const {width: w, height: h} = this.canvas;
    const ctx = this.context;

    ctx.clearRect(0, 0, w, h);
};

/**
 * 向根节点添加一个图形
 */
proto.add = function (type, opts) {
    return this.root.add(type, opts);
};

/**
 *  从根节点删除一个图形
 */
proto.remove = function (geometry) {
    return this.root.remove(geometry);
};

/**
 * 拓展一个图形类
 *
 * @param options
 */
Can.extend = function (options) {
    var baseOpt = options || {};

    // 定义一个类
    var Component = class extends Geometry {
        constructor(options) {
            options = options || {};

            var baseData = typeof baseOpt.data === 'function' ? baseOpt.data() : {};
            var data = typeof options.data === 'function' ? options.data() : {};

            options.data = _.defaults(data, baseData);

            super(options);
        }
    }

    // var proto = Component.prototype;
    //
    // var tempalte = baseOpt.template;
    // if(!tempalte) {
    //     throw new Error('无效的template，无法创建自定义组件');
    // }
    // var ast = parseHTML(tempalte);
    // var render = generate(ast);
    //
    // console.dir(ast);
    // console.log(render);
    //
    // // 重写Sub的paint方法
    // proto.paint = new Function('ctx', render);

    return Component;
};

/**
 * 定义一个组件
 *
 */
Can.component = function (name, options) {
    var Component = this.extend(options);
    var proto = Component.prototype;

    options = options || {};

    var tempalte = options.template;

    if (!tempalte) {
        throw new Error('无效的template，无法创建自定义组件');
    }
    var ast = parseHTML(tempalte);
    var render = generate(ast);

    console.dir(ast);
    console.log(render);

    // 重写Sub的paint方法
    proto.paint = new Function('ctx', render);

    GEOM_MAP.set(name, Component);

    return Component;
};

/**
 * 定义一个基础图形
 */
Can.basic = function (name, options) {
    var Basic = Can.extend(options);
    var proto = Basic.prototype;

    options = options || {};

    if (options.draw) {
        proto.draw = options.draw;
    }

    GEOM_MAP.set(name, Basic);

    return Basic;
}

// Can.components = new Map();

export default Can;
