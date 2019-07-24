## Can 一个基于MVC的Canvas框架

以简单的方式的在canvas上绘图

```javascript
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const myCanvas = new Can(context);

// 绘制一个圆形
var circle1 = myCanvas.add('circle', {
    data: {
        x: 20,          // 圆心x
        y: 20,          // 圆心y
        r: 10,          // 半径
        ss: 'black'     // 路径颜色
    }
});
```

修改圆形的属性，画布将自动重绘，无需开发者主动更新视图
```javascript
circle1.r = 50; //修改圆形的半径后，画布自动重绘
```
---
To be continued.
