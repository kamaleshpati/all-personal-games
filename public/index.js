var canvas = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var c = canvas.getContext("2d");
var c2 = canvas2.getContext("2d");

var colors = ["#d2b4de", "#b4c1de", "#16b4d1", "#16d132", "#f95002", "#f5b7b1", "#212f3c", "blue", "red", "black", "white"];



var mouse1 = {
    x: 0,
    y: 0
}
var mouse2 = {
    x: 0,
    y: 0
}

canvas.addEventListener("mousemove", (e) => {
    mouse1.x = e.x;
    mouse1.y = e.y;
});

canvas2.addEventListener("mousemove", (e) => {
    mouse2.x = e.x;
    mouse2.y = e.y;
});


var dist = (x, y, x1, y1) => {
    return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
}

var n = 1;

class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.dx = 3;
        this.dy = 2;
        this.radius = 10;
        this.color = color;
    }

    draw() {
        c.beginPath();
        if (dist(mouse1.x, mouse1.y, this.x, this.y) <= 20)
            c.arc(this.x, this.y, this.radius + 10 * n++, 0, Math.PI * 2, false);
        else
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c2.beginPath();
        c2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c2.fillStyle = this.color;
        c2.fill();
        c2.closePath();
    }

    update() {
        if (this.radius + this.x > canvas.width)
            this.dx = -this.dx * 0.99;

        if (this.x - this.radius < 0)
            this.dx = -this.dx * 0.99;
        if (dist(mouse1.x, mouse1.y, this.x, this.y) <= 20)
            this.dy *= 2;
        if (dist(mouse1.x, mouse1.y, this.x, this.y) < 10)
            this.dx *= 2 * n;

        if (dist(mouse1.x, mouse1.y, this.x, this.y) > 10)
            this.dx *= n / 2;
        if (this.y + this.radius > canvas.height)
            this.dy = -this.dy * 0.99;
        if (this.y - this.radius < 0)
            this.dy = -this.dy * 0.99;

        this.y += this.dy;
        this.draw();
    }
}

var balls = [];
for (let i = 0; i < 500; i++) {
    x = Math.random() * 35 + i;
    y = Math.random() * 205 + 20 - i;
    balls.push(new Ball(x, y, colors[i % colors.length]));
    x = Math.random() * 70 + i;
    y = Math.random() * 350 + 20 - i;
    balls.push(new Ball(x, y, colors[i % colors.length]));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c2.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
}

animate();