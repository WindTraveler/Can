// import { parseHTML} from "./parse";
const parseHTML = require('./parse');

var template = `
    <group c-if="isShow">
        <circle id="maxy" c-for="item in list"/>
    </group>
`;

// 抽象语法树
var ast = parseHTML(template);


console.log(ast);
