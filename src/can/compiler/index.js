// import { parseHTML} from "./parse";
const parseHTML = require('./parse');
const generate = require('./generate');

var template = `
    <group c-if="isShow" c-for="item in list">
        <circle x="60" y="60" r="40" c-for="item in sz"/>
        <rect x="80" y="80" width="30" height="40"/>
    </group>
`;

// 抽象语法树
var ast = parseHTML(template);

console.log(ast);

var drawStr = generate(ast);

console.log(drawStr);

export { parseHTML, generate};
