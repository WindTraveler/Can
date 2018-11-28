function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

var cproto = Circle.prototype;

// 圆形自己的绘制方法
cproto.draw = function (ctx) {
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
};

cproto.clear = function () {
    
};

module.exports = Circle;