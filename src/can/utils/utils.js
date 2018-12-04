const utils = {};

/**
 * 为对象设置ES5属性
 *
 */
utils.assignPropsAndMethods = function (obj, options) {
    var keys = Object.keys(options);
    var props = {};

    keys.forEach(key => {
        let value = options[key];

        if(typeof value === "function"){
            obj[key] = value;
        }
        else {
            var prop = {
                get() {
                    return value;
                },
                set(newValue) {
                    value = newValue;
                    obj.trigger('repaint');
                }
            };
            props[key] = prop;
        }
    });

    Object.defineProperties(obj, props);
};

module.exports = utils;