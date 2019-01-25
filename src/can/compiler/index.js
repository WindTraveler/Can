// import { parseHTML} from "./parse";
const parseHTML = require('./parse');
const generate = require('./generate');

var template = `
    <group c-if="isShow">
        <circle :x="item.x" :y="item.y" :r="item.r" c-for="item in list"/>
        <rect x="80" y="80" width="30" height="40"/>
    </group>
`;

// 抽象语法树
var ast = parseHTML(template);

// console.log(ast);

var drawStr = generate(ast);

// console.log(drawStr);

export { parseHTML, generate};
