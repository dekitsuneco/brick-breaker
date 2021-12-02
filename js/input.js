export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', event => {
            switch (event.key) {
                // Paddle control:
                case 'ArrowRight':
                    paddle.moveRight();
                    break;
                case 'ArrowLeft':
                    paddle.moveLeft();
                    break;
                // Pause and menu:
                case ' ':
                    game.togglePause();
                    break;
                case 'Enter':
                    game.start();
            }
        });

        document.addEventListener('keyup', event => {
            switch (event.key) {
                // Paddle control - make it stop properly:
                case 'ArrowRight':
                    if (paddle.currentSpeed > 0) {
                        paddle.stop();
                    }
                    
                    break;
                case 'ArrowLeft':
                    if (paddle.currentSpeed < 0) {
                        paddle.stop();
                    }

                    break;
            }
        });
    }
}
