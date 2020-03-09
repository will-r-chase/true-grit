const gritty_popup = document.querySelector('img.popup');
const dropdown1 = document.querySelector('.dropdown1');
const dropdown2 = document.querySelector('.dropdown2');
const dropdown3 = document.querySelector('.dropdown3');
const dropdown4 = document.querySelector('.header_drop');
const help_button = document.querySelector('.get_out');
const panic = document.querySelector('div.big_text');
const help = document.querySelector('div.medium_text');
const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const { width, height } = canvas;
const speedX = 10;
const speedY = 0;
let posX = 150; 
let posY = 450;
let bullets = [];
let isDrawing = false;

const hoseImg = new Image();
hoseImg.src = "./static/img/gritty_hose.png";
const gunImg = new Image();
gunImg.src = "./static/img/gritty_cannon.png";

//Create popup for gritty on bottom of screen when clicked
gritty_popup.addEventListener('click', e => {
    e.currentTarget.classList.toggle('open');
})

help_button.addEventListener('click', () => {
    panic.classList.toggle('show');
    help.classList.toggle('show');
    dropdown1.classList.toggle('drop');
    dropdown2.classList.toggle('drop');
    dropdown3.classList.toggle('drop');
    dropdown4.classList.toggle('drop2');
})

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function drawBullet() {
    if(isDrawing) {
        let b = { x: posX, y: posY};
        bullets.push(b);
    }
    if(bullets.length) {
        for(let i = 0; i < bullets.length; i++) {
            ctx.drawImage(hoseImg, bullets[i].x, bullets[i].y)
        }
    }
    ctx.drawImage(gunImg, posX - 130, posY - 65);
}

function moveBullet() {
    for(let i = 0; i < bullets.length; i++) {
        bullets[i].x += speedX;
        bullets[i].y += speedY;
        if(bullets[i].x < 0 || bullets[i].x > width ||
           bullets[i].y < 0 || bullets[i].y > height) { bullets.splice(i, 1); }
    }
}

function loop() {
    clearCanvas();
    moveBullet();
    drawBullet();
}

function handleMousedown(e) {
    isDrawing = true;
    let mousePos = getMousePos(canvas, e);
    posX = mousePos.x * 2;
    posY = mousePos.y * 2;
    console.log(isDrawing)
}

function handleMouseup() {
    isDrawing = false;
}

function handleMousemove(e) {
    // if(isDrawing) {
    //     let mousePos = getMousePos(canvas, e);
    //     let b = { x: mousePos.x * 2, y: mousePos.y * 2};
    //     bullets.push(b);
    // }
    let mousePos = getMousePos(canvas, e);
    posX = mousePos.x * 2;
    posY = mousePos.y * 2;
    console.log('moved!')
}

function init() {
    setInterval(loop, 25);
    canvas.addEventListener('mousedown', handleMousedown)
    canvas.addEventListener('mouseup', handleMouseup)
    canvas.addEventListener('mousemove', handleMousemove)
}


init()



//This prevents the CSS animations on page load
window.onLoad(body.classList.remove('preload'));
