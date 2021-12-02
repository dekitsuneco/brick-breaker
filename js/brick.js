import { detectCollision } from "./collistionDetection.js";

export default class Brick {
    constructor(game, position) {
        this.image = document.getElementById('img-brick');
        this.game = game;

        this.position = position;
        this.size = {
            width: 80,
            height: 24,
        };

        this.isHit = false;
    }

    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;

            this.isHit = true;
        }
    }

    draw(context) {
        context.drawImage(
            this.image, 
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height,
        );
    }
}
