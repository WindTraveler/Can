/**
 * 将ast转换为draw方法字符串
 * new Function('obj', 'with(obj){...}');
 *
 * @param ast
 */
function generate(ast) {
    if (ast) {
        return `with(this){${genElement(ast)}}` ;
    }
};

function genIf(el) {
    el.ifProcessed = true;

    if(!el.ifConditions.length) {
        return '';
    }

    return `
        if(${el.ifConditions[0].exp}){
            ${genElement(el)}
        }
    `;
}

function genFor(el) {
    el.forProcessed = true;

    const exp = el.for;
    const alias = el.alias;


    return `${exp}.forEach((${alias}, index) => {${genElement(el)}})`;
}

function genChildren(el) {
    if (el && el.children && el.children.length > 0) {
        return el.children.map(el => {
            return genElement(el);
        }).join(';');
    }
    return '';
}

function genGeometry(el) {
    if (el) {
        return `new ${genConstructor(el)}({data:${genData(el)}}).paint(ctx)`;
    }
    return '';
}

/**
 * 生成data属性的字符串
 *
 * @param el
 */
function genData(el) {
    var m = el.attrsMap;

    if (m) {
        var content = Object.keys(m)
                        .map(key => {
                            var begin = key[0];

                            switch (begin) {
                                case ':':
                                    return `"${key.substring(1)}": ${m[key]} `;
                                default:
                                    return `"${key}": "${m[key]}"`;
                            };
                        })
                        .join(',');

        return `{${content}}`;
    }
    return '{}';
}

/**
 * 生成构造函数字符串
 *
 * @param el
 */
function genConstructor(el) {
    if (GEOM_MAP.has(el.tag)) {
        return `(GEOM_MAP.get('${el.tag}'))`;
    }
    return '';
}

function genElement(el) {
    // if的优先级较高
    if (el.if && !el.ifProcessed) {
        return genIf(el);
    } else if (el.for && !el.forProcessed) {
        // 在处理循环
        return genFor(el);
    } else {
        // 处理节点
        // 处理包装节点
        if (el.tag === 'group') {
            return genChildren(el);
        }
        else {
            // 处理几何节点
            return genGeometry(el);
        }
    }
}

module.exports = generate;
