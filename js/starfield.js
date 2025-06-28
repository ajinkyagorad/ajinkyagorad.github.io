"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startStarfield = startStarfield;
function startStarfield(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    var stars = [];
    var count = 200;
    var comets = [];
    function init() {
        resize();
        for (var i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.2 + 0.1,
                twinkle: Math.random() * 0.5 + 0.5,
            });
        }
    }
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        stars.forEach(function (star) {
            ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 * star.twinkle));
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        comets.forEach(function (comet) {
            ctx.globalAlpha = 1;
            var gradient = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 80);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, 80, 0, Math.PI * 2);
            ctx.fill();
            comet.x += comet.speed;
            comet.y += comet.speed * 0.3;
        });
        if (Math.random() < 0.002) {
            comets.push({
                x: -100,
                y: Math.random() * canvas.height * 0.5,
                size: 2,
                speed: Math.random() * 4 + 4,
                twinkle: 1,
            });
        }
        while (comets.length > 3)
            comets.shift();
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    init();
    draw();
}
