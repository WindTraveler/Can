import './index.css';
import Can from './can';
import today from './App.can';
import {Circle} from "./can/geometry";

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

console.log(today);

// 声明一个Can的实例
var myCanvas = new Can(context);

// var c1 = window.c = myCanvas.add('circle', {
//     data: {
//         x: 20,
//         y: 20
//     }
// });
//
// var data = window.data = {
//     x: 20,
//     y: 50,
// };
// var r1 = window.r1 =myCanvas.add('rect', {
//     data
// });

// var p1 = myCanvas.add('poly', {
//     data: {
//         x: 100,
//         y: 100,
//         r: 30,
//         sides: 3
//     }
// });
//
// var t1 = myCanvas.add('text', {
//     data: {
//         x: 100,
//         y: 100,
//         value: 'Love Jenny'
//     }
// });
//
// var img1 = myCanvas.add('image', {
//     data: {
//         src: 'luffy.jpg',
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 100
//     }
// });

// myCanvas.paint();

// 组件demo
// <group c-if="isShow">
//     <circle :x="item.x" :y="item.y" :r="item.r" c-for="item in list"/>
//     <rect x="80" y="80" width="30" height="40"/>
// </group>

var Maxy = Can.define('maxy', {
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

var m = window.m = myCanvas.add('maxy', {
    data() {
        return {
            list: [
                {x: 100, y: 100, r: 20, fs: 'red'},
                {x: 200, y: 200, r: 40, fs: 'blue'}
            ]
        };
    }
});



// myCanvas.add('maxy', {});


// 运动动画测试
// c1.velocityX = 5;
// c1.velocityY = 5;

function drawBalls() {
    moveBall(c1);
    requestAnimationFrame(drawBalls);
}

function moveBall(ball) {
    if (ball.x + ball.velocityX + ball.r > canvas.width ||
        ball.x + ball.velocityX - ball.r < 0) {
        ball.velocityX = -ball.velocityX;
    }

    if (ball.y + ball.velocityY + ball.r > canvas.height ||
        ball.y + ball.velocityY - ball.r < 0) {
        ball.velocityY = -ball.velocityY;
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
}

// requestAnimationFrame(drawBalls);

// 方便调试
window.myCanvas = myCanvas;
// window.c = c1;
// window.r = r1;
// window.p = p1;
// window.t = t1;
// window.img = img1;


