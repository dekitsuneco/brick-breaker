export default class Paddle {
    constructor(game) {
        this.game = game;

        this.size = {
            width: 150,
            height: 20,
        };

        this.maxSpeed = 10;
        this.currentSpeed = 0;

        this.position = {
            x: this.game.size.width / 2 - this.size.width / 2,
            y: this.game.size.height - this.size.height - 10,
        };
    }

    moveLeft() {
        this.currentSpeed = -this.maxSpeed;
    }

    moveRight() {
        this.currentSpeed = this.maxSpeed;
    }

    stop() {
        this.currentSpeed = 0;
    }

    draw(context) {
        context.fillStyle = '#0ff';
        context.fillRect(
            this.position.x, 
            this.position.y, 
            this.size.width, 
            this.size.height
        );
    }

    update() {
        this.position.x += this.currentSpeed;

        // Reached the left side of the screen:
        if (this.position.x < 0) {
            this.position.x = 0;
        }

        // Reached the right side of the screen:
        if (this.position.x + this.size.width > this.game.size.width) {
            this.position.x = this.game.size.width - this.size.width;
        }
    }
}
