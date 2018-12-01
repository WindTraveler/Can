const _ = require('underscore');
const Events = require('../events');

function Circle() {
    var attrs = _.defaults(arguments[0], this.defaults);
    var {x: _x, y: _y, r: _r, ss: _ss, fs: _fs} = attrs;

    this._id = _.uniqueId('gem_');

    // 定义属性
    Object.defineProperties(this, {
        id: {
            get() {
                return this._id;
            }
        },
        x: {
            get() {
                return _x;
            },
            set(value) {
                _x = value;
                this.trigger('repaint');
            }
        },
        y: {
            get() {
                return _y;
            },
            set(value) {
                _y = value;
                this.trigger('repaint');
            }
        },
        r: {
            get() {
                return _r;
            },
            set(value) {
                if (+value >= 0) {
                    _r = value;
                    this.trigger('repaint');
                }
            }
        },
        ss: {
            get() {
                return _ss;
            },
            set(value) {
                _ss = value;
                this.trigger('repaint');
            }
        },
        fs: {
            get() {
                return _fs;
            },
            set(value) {
                _fs = value;
                this.trigger('repaint');
            }
        }
    });
}

var cproto = Circle.prototype;

_.extend(cproto, Events, {
    defaults: {
        x: 0,
        y: 0,
        r: 20,
        fs: 'transparent',
        ss: 'black'
    }
});

cproto.paint = function (ctx) {
    this.preDraw(ctx);
    this.draw(ctx);
    this.postDraw(ctx);
};

// 圆形自己的绘制方法
cproto.draw = function (ctx) {
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
};

cproto.preDraw = function (ctx) {
    ctx.fillStyle = this.fs;
    ctx.strokeStyle = this.ss;
    ctx.beginPath();
}

cproto.postDraw = function (ctx) {
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

module.exports = Circle;