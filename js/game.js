import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';

import { renderBricksForThisLevel, level1, level2 } from './levels.js';

const GAME_STATES = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAME_OVER: 3,
    NEW_LEVEL: 4,
};

export default class Game {
    constructor(width, height) {
        this.size = { width, height };

        this.state = GAME_STATES.MENU;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.bricks = [];
        this.gameObjects = [this.ball, this.paddle];

        this.livesCount = 3;

        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (
            this.state !== GAME_STATES.MENU &&
            this.state !== GAME_STATES.NEW_LEVEL
        ) {
            return;
        }

        this.ball.reset();
        this.bricks = renderBricksForThisLevel(this, this.levels[this.currentLevel]);

        this.state = GAME_STATES.RUNNING;
    }

    update(deltaTime) {
        if (this.livesCount === 0) {
            this.state = GAME_STATES.GAME_OVER;
        }

        if (
            this.state === GAME_STATES.PAUSED || 
            this.state === GAME_STATES.MENU || 
            this.state === GAME_STATES.GAME_OVER
        ) {
            return;
        }

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.state = GAME_STATES.NEW_LEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter((brick) => !brick.isHit);
    }

    draw(context) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(context));

        if (this.state == GAME_STATES.PAUSED) {
            context.rect(0, 0, this.size.width, this.size.height);
            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('Paused', this.size.width / 2, this.size.height / 2);
        }
        
        if (this.state === GAME_STATES.MENU) {
            context.rect(0, 0, this.size.width, this.size.height);
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('Press "ENTER" to Start', this.size.width / 2, this.size.height / 2);
        }

        if (this.state === GAME_STATES.GAME_OVER) {
            context.rect(0, 0, this.size.width, this.size.height);
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.fill();

            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('GAME OVER', this.size.width / 2, this.size.height / 2);
        }
    }

    togglePause() {
        if (this.state == GAME_STATES.PAUSED) {
            this.state = GAME_STATES.RUNNING;
        } else {
            this.state = GAME_STATES.PAUSED;
        }
    }
}
