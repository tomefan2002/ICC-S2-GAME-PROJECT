class Ball {
    constructor() {
        this.diameter = 25;
        this.ballX = 300;
        this.ballY = 300;
        this.ballXSpeed = 4;
        this.ballYSpeed = -3.5;
        this.ballFillR = 3; 
        this.ballFillG = 244;
        this.ballFillB = 252;

    }

    displayBall() {
        fill(this.ballFillR, this.ballFillG, this.ballFillB, 70);
        ellipse(this.ballX, this.ballY, this.diameter);
    }

    movementBall() {
        this.ballX += this.ballXSpeed;
        this.ballY += this.ballYSpeed;
    }

    resetBall() {
        this.ballX = 300;
        this.ballY = 300;
    }

    resetBallHard() {
        this.ballX = 300;
        this.ballY = 300;
        fill(252, 3, 61, 70);
    }

}
