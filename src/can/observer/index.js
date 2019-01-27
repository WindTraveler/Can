
/**
 * 给对象的一个属性定义响应式属性
 */
function defineReactive(obj, key, val, cb) {
    // let dep = new Dep();
    observe(obj[key], cb);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            // if (Dep.target) {
            //     dep.addSub(Dep.target);
            // }
            return val;
        },
        set(newVal) {
            if(val === newVal) {
                return ;
            }
            val = newVal;
            typeof cb === "function" && cb();
        }
    })
}



export function observe(value, cb) {
    if (Array.isArray(value)) {
        // 数组本身
        value.cb = cb;

        protoAugment(value, arrayMethods);

        // 数组项
        observeArray(value, cb);
    }
    else {
        // 走对象
        walk(value, cb);
    }
}


function observeArray (items, cb) {
    for (var i = 0, l = items.length; i < l; i++) {
        observe(items[i], cb);
    }
}

function walk(obj, cb) {
    if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key], cb);
        });
    }
}


function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
}

function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    // 'sort',
    // 'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
        var args = [], len = arguments.length;
        var cb = this.cb;
        while ( len-- ) args[ len ] = arguments[ len ];

        var result = original.apply(this, args);
        // var ob = this.__ob__;
        var inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break
            case 'splice':
                inserted = args.slice(2);
                break
        }
        if (inserted) { observeArray(inserted, cb); }
        // 触发重绘
        cb();
        return result;
    });
});
