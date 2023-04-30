class Ball { // creates and names my Ball class ready to be used in sketch.js to draw my ball, move it around the screen and reset its X & Y position when a new game starts
    constructor() { // creates an instance of my Ball object
        this.diameter = 25; // assigns the value of 25 to my Ball object's diameter
        this.ballX = 300; // assigns the value of 300 to my Ball object's X position
        this.ballY = 300; // assigns the value of 300 to my Ball object's Y position 
        this.ballXSpeed = 4; // assigns the value of 4 to my balls X speed. this is one of the values that change in hard mode
        this.ballYSpeed = -7; // assigns the value of -7 to my balls Y speed. this is one of the values that change in hard mode
        this.ballFillR = 3; // assigns value of 3 to my Ball object's 'Red-channel' with combines with the Green and Blue channels to create an RGB fill colour
        this.ballFillG = 244; // assigns value of 244 to my Ball object's 'Green-channel' with combines with the Red and Blue channels to create an RGB fill colour
        this.ballFillB = 252; // assigns value of 252 to my Ball object's 'Blue-channel' with combines with the Green and Red channels to create an RGB fill colour

    }

    displayBall() { // a fucntion to display my Ball object in sketch.js
        fill(this.ballFillR, this.ballFillG, this.ballFillB);
        ellipse(this.ballX, this.ballY, this.diameter); // ellipse with X, Y and Diamater values of this.ballX, this.ballY and this.diameter (300, 300, 25) 
    }

    movementBall() { // a function to move the Ball object in a diangular motion (these are the values that reverse when the ball collides and 'reflects' off something)
        this.ballX += this.ballXSpeed; // effectively removing 4px from my Ball object's X position every frame (higher values in hard mode)
        this.ballY += this.ballYSpeed; // effectively removing -7px from my Ball object's Y position every frame (higher values in hard mode)
    }

    resetBall() { // function to reset the Ball object's position to the centre of the screen when a new game starts (Y value smaller in hard mode)
        this.ballX = 300;
        this.ballY = 300;
    }
}
