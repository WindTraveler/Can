import './index.css';
import Can from './can';
import today from './App.can';
import {Circle} from "./can/geometry";

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

console.log(today);

// 声明一个Can的实例
var myCanvas = new Can(context);

var c1 = window.c = myCanvas.add('circle', {
    data: {
        x: 20,
        y: 20,
        ss: 'black'
    }
});

var c2 = window.c2 = myCanvas.add('circle', {
    data: {
        x: 20,
        y: 40,
        ss: 'black'
    }
});

Can.component('cc', {
    template: `
        <group>
            <circle :x="x"/>
        </group>
    `,
    data() {
        return {
            x: 20,
            y: 20
        };
    }
});

var cc = window.cc = myCanvas.add('cc');

var r = window.r = myCanvas.add('rect', {
    data: {
        x: 10,
        y: 10,
        width: 50,
        height: 100,
        ss: 'black'
    }
});

window.path = myCanvas.add('path', {
    data() {
        return {
            points: [10, 10, 20, 20]
        }
    }
});

// 矩形
// var data = window.data = {
//     x: 20,
//     y: 50,
// };
// var r1 = window.r1 =myCanvas.add('rect', {
//     data
// });

var p1 = myCanvas.add('poly', {
    data: {
        x: 100,
        y: 100,
        r: 30,
        sides: 3,
        ss: 'black'
    }
});


// 文字loveJenny
var t = window.t = myCanvas.add('text', {
    data: {
        x: 200,
        y: 130,
        value: 'Love Jenny',
        fontSize: 14,
        ss: 'black'
    }
});

// 图片
var img1 = myCanvas.add('img', {
    data: {
        src: 'luffy.jpg',
        x: 100,
        y: 100,
        width: 100,
        height: 100
    }
});

var Maxy = Can.component('maxy', {
    template: `
        <group c-if="isShow"">
            <circle :x="item.x" :y="item.y" :r="item.r" :fs="item.fs" c-for="item in list"/>
            <!--<rect x="80" y="80" width="30" height="40"/>-->
        </group>
    `,
    data() {
        return {
            isShow: true,
        };
    }
});

// var m = window.m = myCanvas.add('maxy', {
//     data() {
//         return {
//             list: [
//                 {x: 100, y: 100, r: 20, fs: 'red'},
//                 {x: 200, y: 200, r: 40, fs: 'blue'}
//             ]
//         };
//     }
// });
//
// Can.basic('ellipse', {
//     data() {
//         return {
//             x: 100,
//         };
//     },
//     draw(ctx) {
//         // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
//         ctx.ellipse(this.x, 40, 20, 10, 0, 0, Math.PI * 2, false);
//     }
// });

// window.e  = myCanvas.add('ellipse', {
//     data() {
//         return {
//             x: 300
//         };
//     }
// });


// window.curve = myCanvas.add('curve', {
//     data() {
//         return {
//             points: [50, 50, 70, 200, 20, 10, 100, 50]
//         }
//     }
// })

window.myCanvas = myCanvas;
window.ctx = context;


