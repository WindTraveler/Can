import './index.css';
import Can from './can';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// 声明一个Can的实例
var myCanvas = new Can(context);

var c1 = myCanvas.add('circle', {
    x: 20,
    y: 20
});

var r1 = myCanvas.add('rect', {
    x: 50,
    y: 50
});

var p1 = myCanvas.add('poly', {
    x: 100,
    y: 100,
    r: 30,
    sides: 3
});

var t1 = myCanvas.add('text', {
    x: 100,
    y: 100,
    value: 'Love Jenny'
});

myCanvas.paint();


// 运动动画测试
c1.velocityX = 5;
c1.velocityY = 5;

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
window.c = c1;
window.r = r1;
window.p = p1;
window.t = t1;


