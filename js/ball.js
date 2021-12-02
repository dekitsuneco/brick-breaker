import { detectCollision } from "./collistionDetection.js";

export default class Ball {
    constructor(game) {
        this.image = document.getElementById('img-ball');
        this.game = game;

        this.speed = {
            x: 4,
            y: -2,
        };

        this.reset();
    }

    reset() {
        this.volume = 16;
        this.position = {
            x: 10,
            y: 400
        };
    }

    draw(context) {
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.volume, 
            this.volume
        );
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Does the ball hit the walls?
        if (this.position.x + this.volume > this.game.size.width || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // Does the ball hit the ceiling?
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        // Does the ball hit the floor?
        if (this.position.y + this.volume > this.game.size.height) {
            this.game.livesCount--;
            this.reset();
        }

        // Does the ball hit the paddle?
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.volume;
        }
    }
}
