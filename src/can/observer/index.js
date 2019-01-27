

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
            cb();
        }
    })
}



export function observe(value, cb) {
    if (value && typeof value === 'object') {
        Object.keys(value).forEach(key => {
            defineReactive(value, key, value[key], cb)
        });
    }
}
