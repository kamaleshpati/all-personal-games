var canvas = document.getElementById("myCanvas");
// console.log(canvas);
var c = canvas.getContext("2d");

var result = document.getElementById("result");

class Board {
    constructor() {
        this.x = 10;
        this.y = 1;
        this.lentgh = 100;
        this.lineWidth = 15;
    }

    draw() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + this.lentgh, 0);
        c.lineWidth = this.lineWidth;
        c.stroke();
        c.closePath();
    }

    update(x) {
        c.clearRect(0, 0, canvas.width, 3)
        this.x = x;
        this.draw();
    }
}


class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 3;
        this.dy = 3;
        this.radius = 50;
        this.color = "red";
        this.originalColor = "red";
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        if (this.radius + this.x > canvas.width)
            this.dx = -this.dx;

        if (this.x - this.radius < 0)
            this.dx = -this.dx;

        if (this.y + this.radius > canvas.height)
            this.dy = -this.dy;

        if (this.y - this.radius < 0)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        c.clearRect(0, 3, canvas.width, canvas.height);
        this.draw();
    }
}
var ball = new Ball(200, 200);
var board = new Board();
var x;
var res = 0;
canvas.addEventListener("mousemove", (event) => {
    x = event.x;
});

function animate() {
    requestAnimationFrame(animate);
    ball.update();
    board.update(x);
    if (ball.x > board.x - board.lentgh && ball.x < board.x + 100) {
        if (ball.y - ball.radius <= board.y) {
            ball.dy = -ball.dy;
            res++;
            ball.color = "black";
            result.innerHTML = res;
            if (res > 0 && res >= 15) {
                ball.dx = ball.dy = 10;
            }
        } else {
            ball.color = ball.originalColor;
        }
    } else {
        if (ball.y - ball.radius <= board.y) {
            ball.color = "blue";
            alert("u lost");
            window.location.reload();
        }
    }

}

animate();