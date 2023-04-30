let bg; // canvas background variable
let brickbg; //brick background variable
let platimg; // platform background variable
let ballimg; // ball background variable
let myFont; // typeface variable
let blockBounceSound; // ball bouncing sound
let blockBreakSound; // ball breaking sound
let blocks = []; // an array that all the 'blocks' 
let PlatX = (600 / 2) - 32.5; // sets platform X location to the centre of the canvas
let PlatY = 600 * 0.75; // sets platform Y location to 75% of the canvas height
let platform = new Platform; // creates a new Platform object
let ball = new Ball; // creates a new Ball object 
let gameStart = true; // boolean setting so the game's start screen shows when loaded in or restarted and starts the game when gameStart = false
let gameLoss = false; // boolean so if you if you die it loads in Game Loss Screen text when gameLoss = true
let hardMode = false;
let score = 0; // sets score start at 0

function preload() { // preloads contenrts before setup runs
    bg = loadImage('images/Sky.png'); // sets varible to load image, sound, etc...
    //IMAGE REFERENCE: https://rare-gallery.com/471923-super-mario-super-mario-bros-video-games-pixel-art.html 
    brickbg = loadImage('images/brick.png'); // sets varible to load image, sound, etc...
    //IMAGE REFERENCE: https://www.pinterest.co.uk/pin/316659417547639010/  
    platimg = loadImage('images/platBrick01.png'); // sets varible to load image, sound, etc...
    //IMAGE REFERENCE: https://www.pinterest.co.uk/pin/316659417547639010/  
    ballimg = loadImage('images/fireball.png'); // sets varible to load image, sound, etc...
    //IMAGE REFERENCE: https://minecraft.novaskin.me/skin/1683293096/8-Bit-Fireball
    myFont = loadFont('assets/MontserratMediumItalic.otf'); // sets varible to load image, sound, etc...
    //FONT REFERENCE: https://www.fontspace.com/montserrat-font-f16544
    blockBounceSound = loadSound('assets/8bitBounce.wav'); // sets varible to load image, sound, etc...
    //SOUND REFERENCE: https://www.soundsnap.com/sci_fi_interface_accent_retro_video_game_sounding_arcade_sound_2
    blockBreakSound = loadSound('assets/8bitBreak.wav'); // sets varible to load image, sound, etc...
    //SOUND REFERENCE: https://www.soundsnap.com/8_bit_accent_footsteps_on_gravel_walking_with_regular_shoes_19
}

function setup() { // called only once when the game begins 
    createCanvas(600, 600); // sets canvas to 600px by 600px
    frameRate(60); //sets framerate to 60fps
    for (let row = 0; row < 3; row++) { // a for loop iterating and creating 24 blocks in a 8 unit wide, 3 unit tall arrangement
        for (let column = 0; column < 8; column++) {
            let block = new Block(column, row); // creates a new Block object and initialises each with column and row from the above for loop
            blocks.push(block); // adds each of the blocks to my 'blocks' array 
        }
    }
}

function draw() { // called every frame 

    if (gameStart == true) { // if gameStart == true it draws all my home screen elements 
        background(bg);
        fill(255);
        textFont(myFont);
        textSize(30);
        stroke(0);
        strokeWeight(4);
        text('Atari Breakout Clone', 20, 50);
        textSize(20);
        text('Semester 2 Introduction to Creative Coding Project', 20, 90);
        text('By Thomas Lynn 21016998 ', 20, 130);
        textSize(15);
        text('Bounce the ball off the platform to break blocks and win!', 20, 250);
        text('Use the arrow keys to control the platform', 20, 290);
        textSize(20);
        text('Press 1 for Easy Mode', 20, 450);
        text('Press 2 for Hard Mode', 20, 490);
    } else { // otherwise call the levelBegin function and begin drawing the game
        levelBegin();
    }

    keyPressed(); // calls my keyPressed function
    console.log(gameStart); // logs status of gameStart variable
    console.log(hardMode); // logs status of hardMode Variable
}

function levelBegin() { // draws the game

    background(bg); // sets background to my bg variable that I set to 'Sky.png' in preload()
    stroke(1);
    strokeWeight(3);
    fill(255);
    text("Score: " + score, 490, 550); // creates score that increases dependant on the score variable

    if (gameLoss == false) { // once the game loss screen shows stop moving the ball 
        ball.movementBall();
    }

    ball.displayBall(); // shows the ball
    ballCollisions(); // calls my ballCollisions function
    image(ballimg, ball.ballX - 16, ball.ballY - 16); // overlays my ball background image on top on my ball

    for (let blockindex = 0; blockindex < blocks.length; blockindex++) { // a for loop iterating through the length of my array and showing each block
        let block = blocks[blockindex];
        block.display();
    }

    platform.displayPlat(); // shows the platform
    image(platimg, platform.PlatX, platform.PlatY); // overlays my platform background image on top of my platform

    if (keyIsDown(LEFT_ARROW)) { // continuously calls my platform.left function when the left arrow keys held down  
        platform.left();
    }

    if (keyIsDown(RIGHT_ARROW)) { // does the same but for the right arrow key
        platform.right();
    }

    if (score == 24) { // if score = 24 display the 'Winner' text
        fill(255);
        text("Winner! Press space to restart", width / 2 - 145, height / 2);
    }
}

function ballCollisions() { // a fucntion that contains my ball collisions
    if (platformCollides(platform.PlatX, platform.PlatY, platform.PlatW, platform.PlatH, ball.ballX, ball.ballY)) { // if my platformCollides function = true
        ball.ballYSpeed = -ball.ballYSpeed; // reflect the ball in opposite direction
        blockBounceSound.play(); // plays ball bouncing sound when ball reflects
    }

    for (let b = 0; b < blocks.length; b++) { // iterates through blocks arrary and checks if the ball's colliding with each of the blocks in the array

        let block = blocks[b];

        if (dist(ball.ballX, ball.ballY, block.x + (block.width / 2), block.y + (block.height / 2)) < ball.diameter * 1.5 && block.visible) { // if distance from the ball to any of the blocks in the array is equal to less than 1.5 times the diameter of the ball and the block is visible 
            ball.ballYSpeed = -ball.ballYSpeed; // reflect the ball in opposite direction
            blockBreakSound.play(); // plays ball breaking sound if the ball collides
            block.visible = false; // hides the block and stops displaying it 
            score++; // increases the score by 1 point if a block breaks
        }
    }

    if (ball.ballX > width - ball.diameter || ball.ballX < ball.diameter) { // if the ball's X value is less than or greater than the canvas width the ball reflects and it plays the ball bouncing sound
        ball.ballXSpeed = -ball.ballXSpeed;
        blockBounceSound.play();
    }

    if (ball.ballY < ball.diameter) { // if the ball's Y value is less than the canvas height the ball reflects and it plays the ball bouncing sound
        ball.ballYSpeed = - ball.ballYSpeed;
        blockBounceSound.play();
    }

    if (ball.ballY > height - ball.diameter) { // if the ball's Y value is greater than the canvas height (i.e. goes off the bottom of the canvas) it displays the game loss text and sets my gameLoss variable to true
        fill(255);
        text("You lose! Press space to restart", width / 2 - 145, height / 2);
        platform.PlatSpeed = 0; // stops the platform
        gameLoss = true; // reloads start screen 
    }
}

function platformCollides(PlatX, PlatY, PlatW, PlatH, ballX, ballY) { // function to check if the ball is inside the platform
    if (ballX > PlatX && ballX < PlatX + PlatW && ballY > PlatY && ballY < PlatY + PlatH) {
        return true; // sets the platformCollides function to true and my platformCollides if statement reflects the ball 
    } else {
        return false;
    }
}

function keyPressed() { // a function to check whether keys are being pressed 
    if (gameStart == true && key == '1') { // when the game start screen is displaying (i.e. when game is loaded or restarted) if the user presses 1 it loads easy mode and starts the game
        gameLoss = false; // resets gameLoss variable
        gameStart = false; // stops displaying the start screen
        hardMode = false; // hardmode status
        resetEasy(); // calls my resetEasy function that loads and resets the position of ball & platform, the ball & platform's speeds, and resets and makes all the blocks re-visible
        score = 0; // resets score

    }
    if (gameStart == true && key == '2') { // when the game start screen is displaying (i.e. when game is loaded or restarted) if the user presses 2 it loads hard mode and starts the game
        gameLoss = false; // resets gameLoss variable
        gameStart = false; // stops displaying the start screen
        hardMode = true; // hardmode status
        resetHard();// calls my resetHard function that loads and resets the position of ball & platform, sets the ball & platform's speeds to their hard mode values, and resets and makes all the blocks re-visible
        score = 0;
    }
    if (gameLoss == true && key == ' ') { // if the game loss screen is showing and you press spacebar it re-loads the game start screen
        gameStart = true;
    }
    if (score == 24 && key == ' ') { // if the score is equal to 24 and you press spacebar it re-loads the game start screen
        gameLoss = true;
    }
}

function resetEasy() {

    for (let b = 0; b < blocks.length; b++) { // for loop that iterates through my 'blocks' array and makes all the blocks re-visible
        let block = blocks[b];
        block.visible = true;
    }
    if (frameCount % 2) { // adds some randomness to whether the ball bounces left or right when game begins by seeing if the frame-count is odd or even which at 60fps is fairly random
        ball.ballXSpeed = 4; // easy mode speed values
        ball.ballYSpeed = -7; // easy mode speed values 
    } else {
        ball.ballXSpeed = -4; // easy mode speed values
        ball.ballYSpeed = -7; // easy mode speed values 
    }

    platform.PlatSpeed = 7; // easy mode speed values

    ball.resetBall(); // calls the resetBall() function that sets the ballX and Y positions to the centre of the canvas
    platform.resetPlat(); // calls the resetPlat() functions that sets the PlatX position the centre of the screen and the PlatY position to 75% of the canvas's height
}

function resetHard() {

    for (let b = 0; b < blocks.length; b++) { // for loop that iterates through my 'blocks' array and makes all the blocks re-visible
        let block = blocks[b];
        block.visible = true;
    }

    ball.resetBall();
    platform.resetPlat();

    ball.ballY = 240; // overides easy mode's ballY position and makes it smaller to make it possible to reach the ball in time with its increased speed 
    ball.ballXSpeed = 7; // hard mode speed values
    ball.ballYSpeed = 9; // hard mode speed values

    if (frameCount % 2) { // adds some randomness to whether the ball bounces left or right when game begins by seeing if the frame-count is odd or even which at 60fps is fairly pretty random
        ball.ballYSpeed = - ball.ballYSpeed; // when the ball is first drawn it reflects upward, in the opposite direction to the bottom of the canvas, so the user has more time to reach the ball with its increased speed
        ball.ballXSpeed = - ball.ballXSpeed; // when the ball is first drawn it reflects upward, in the opposite direction to the bottom of the canvas, so the user has more time to reach the ball with its increased speed
    } else {
        ball.ballYSpeed = - ball.ballYSpeed; // when the ball is first drawn it reflects upward, in the opposite direction to the bottom of the canvas, so the user has more time to reach the ball with its increased speed
    }
    platform.PlatSpeed = 12; // hard mode speed values
}