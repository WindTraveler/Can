import './index.css';
import Can from './can';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var c = new Can(context);

context.beginPath();

c.draw();

context.stroke();

