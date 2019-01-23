/**
 * 编译器-解析部分
 *
 * @author WindTraveler(13301156@bjtu.edu.cn)
 */

var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;

var template = `
    <group c:if="{{ isShow }}">
        <circle id="maxy" c:for="{{ list }}"/>
    </group>
`;


function parseHTML(html, options) {
    let index = 0;
    let stack = [];
    let currentParent, root;

    // 主流程逻辑
    while (html) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {

            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                parseEndTag(endTagMatch[1]);
                continue;
            }

            if (html.match(startTagOpen)) {
                //...process start tag
                const startTagMatch = parseStartTag();
                const element = {
                    type: 1,
                    tag: startTagMatch.tagName,
                    lowerCasedTag: startTagMatch.tagName.toLowerCase(),
                    attrsList: startTagMatch.attrs,
                    attrsMap: makeAttrsMap(startTagMatch.attrs),
                    parent: currentParent,
                    children: []
                };

                processIf(element);
                processFor(element);

                if(!root){
                    root = element;
                }

                if(currentParent){
                    currentParent.children.push(element);
                }

                // fixme 如果是group容器,
                if (element.lowerCasedTag === 'group') {
                    stack.push(element);
                    currentParent = element;
                }

                continue;
            }
        }
        else if (textEnd > 0)
        {
            //...process text 处理文本
            let text = html.substring(0, textEnd);
            advance(textEnd);

            continue;
        }
        else {
            // 结束循环
            html = '';
        }
    }

    return root;

    /**
     * 移动游标，截短html
     *
     * @param n
     */
    function advance(n) {
        index += n;
        html = html.substring(n);
    }

    /**
     * Array<Obejct> -> Object
     *
     * @param attrs
     */
    function makeAttrsMap (attrs) {
        var map = {};
        for (var i = 0, l = attrs.length; i < l; i++) {
            map[attrs[i].name] = attrs[i].value;
        }
        return map
    }

    /**
     * 解析开头的标签
     *
     * @returns {{start: number, tagName: string | *, attrs: Array}}
     */
    function parseStartTag () {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index
            }
            advance(start[0].length);

            let end, attr
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3]
                });
            }
            if (end) {
                match.unarySlash = end[1];
                advance(end[0].length);
                match.end = index;
                return match
            }
        }
    }

    /**
     * 解析闭合标签
     *
     * @param tagName
     */
    function parseEndTag (tagName) {
        let pos;
        for (pos = stack.length - 1; pos >= 0; pos--) {
            if (stack[pos].lowerCasedTag === tagName.toLowerCase()) {
                break;
            }
        }

        if (pos >= 0) {
            if (pos > 0) {
                currentParent = stack[pos - 1];
            } else {
                currentParent = null;
            }
            stack.length = pos;
        }
    }

    /**
     * 获取并移除el中的属性
     *
     * @param el
     * @param name
     * @returns {*}
     */
    function getAndRemoveAttr (el, name) {
        let val;
        if ((val = el.attrsMap[name]) != null) {
            const list = el.attrsList
            for (let i = 0, l = list.length; i < l; i++) {
                if (list[i].name === name) {
                    list.splice(i, 1)
                    break
                }
            }
        }
        return val;
    }

    /**
     * 处理for
     *
     * @param el
     */
    function processFor (el) {
        let exp;
        if ((exp = getAndRemoveAttr(el, 'c-for'))) {
            const inMatch = exp.match(forAliasRE);
            el.for = inMatch[2].trim();
            el.alias = inMatch[1].trim();
        }
    }

    /**
     * 处理if
     *
     * @param el
     */
    function processIf (el) {
        const exp = getAndRemoveAttr(el, 'c-if');
        if (exp) {
            el.if = exp;
            if (!el.ifConditions) {
                el.ifConditions = [];
            }
            el.ifConditions.push({
                exp: exp,
                block: el
            });
        }
    }
}


module.exports = parseHTML;
