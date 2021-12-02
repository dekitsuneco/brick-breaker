// Does the ball hit the paddle/brick?
export function detectCollision(ball, gameObject) {
    let ballUnderside = ball.position.y + ball.volume;
    let ballUpside = ball.position.y;

    let objectUpside = gameObject.position.y;
    let objectUnderside = gameObject.position.y + gameObject.size.height;
    let fromLeftOfObject = gameObject.position.x;
    let fromRightOfObject = gameObject.position.x + gameObject.size.width;

    if (
        ballUnderside >= objectUpside &&
        ballUpside <= objectUnderside && 
        ball.position.x >= fromLeftOfObject && 
        ball.position.x + ball.volume <= fromRightOfObject
    ) {
        return true;
    } else {
        return false;
    }
}
