

/**
 * 给对象的一个属性定义响应式属性
 */
function defineReactive(obj, key, val) {
    // let dep = new Dep();

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
        }
    })
}



export function observe(value) {
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key])
    });
}
