const _ = require('underscore');
const Events = require('./events');
const Circle = require('./geometry/circle');

// 命名空间
function Can(context) {
    this.canvas = context.canvas;
    this.context = context;
    this.geometries = [
        new Circle(10, 10, 20)
    ];
};

const proto = Can.prototype;

proto.draw = function () {
    const ctx = this.context;
    const geometries = this.geometries;
    
    geometries.forEach(geo => {
        geo.draw(ctx);
    });
}

export default Can;
