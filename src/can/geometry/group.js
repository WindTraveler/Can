const _ = require('underscore');
const Events = require('../events');
import { Circle, Rect, Img, Text, Poly} from './index';

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
    console.log('绘制次数', ++time);
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

    if (GEOM_MAP.has(type)) {
        Factory = GEOM_MAP.get(type);
    }
    else {
        throw new TypeError('目前并没有该绘制种类：' + type);
    }

    // switch (type) {
    //     case 'circle':
    //         Factory = Circle;
    //         break;
    //     case 'rect':
    //         Factory = Rect;
    //         break;
    //     case 'poly':
    //         Factory = Poly;
    //         break;
    //     case 'text':
    //         Factory = Text;
    //         break;
    //     case 'image':
    //         Factory = Img;
    //         break;
    //     default:
    //         throw new TypeError('目前并没有该绘制种类：' + type);
    // }

    const geom = new Factory(opts);
    this.geometries.push(geom);

    // 监听
    this.listenTo(geom, 'repaint', this.paint);

    //添加之后立即重绘
    this.paint();

    return geom;
};

// var timeId = null;
//
// proto.batchPaint = function() {
//     if (!timeId) {
//         timeId = setTimeout(() => {
//             this.paint();
//         }, 0);
//     }
// };

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

    //重绘
    this.paint();

    return geometry;
}

export default Group;

