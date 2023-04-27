let bg;
let brickbg;
let platimg;
let ballimg;
let myFont;
let blocks = [];
let PlatX = 600 / 2;
let PlatY = 600 * 0.75;
let rectX = 75;
let rectY = 35;
let platform = new Platform;
let ball = new Ball;
let gameStart = true;
let gameLoss = false;
let hardMode = false;
let score = 0; 

function preload() {
    bg = loadImage('images/Sky.png');
    //IMAGE REFERANCE: https://rare-gallery.com/471923-super-mario-super-mario-bros-video-games-pixel-art.html 
    brickbg = loadImage('images/brick.png');
    //IMAGE REFERANCE: https://www.pinterest.co.uk/pin/316659417547639010/  
    platimg = loadImage('images/platBrick01.png');
    //IMAGE REFERANCE: https://www.pinterest.co.uk/pin/316659417547639010/  
    ballimg = loadImage('images/fireball.png');
    //IMAGE REFERANCE: https://minecraft.novaskin.me/skin/1683293096/8-Bit-Fireball
    myFont = loadFont('assets/MontserratMediumItalic.otf');
        //FONT REFERANCE: https://www.fontspace.com/montserrat-font-f16544
}

function setup() {
    createCanvas(600, 600);
    
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 8; column++) {
            let block = new Block(column, row);
            blocks.push(block);
        }
    }
}

function draw() {
   
    if (gameStart == true) {
        background(bg);
        fill(255);
        textFont(myFont);
        textSize(30);
        stroke(0);
        strokeWeight(4);
        text('Atari Breakout clone', 20, 50);
        textSize(20);
        text('Semester 2 Introduction to Creative Coding Project', 20, 90);
        text('By Thomas Lynn 21016998 ', 20, 130);
        textSize(15);
        text('Bounce the Ball off the Platform to break blocks and win!', 20, 250);
        text('Use the arrow keys to control the Platform', 20, 290);
        textSize(20);
        text('Press 1 for Easy Mode', 20, 450);
        text('Press 2 for Hard Mode', 20, 490);
    } else {
        levelBegin(); 
    }

    keyPressed();
    console.log(gameStart);
    console.log(hardMode);
}

function levelBegin() {

    background(bg);
    stroke(1);
    strokeWeight(3);
    fill(255);
    text("Score: " + score, 490,550);

    ball.movementBall();
    ball.displayBall();
    ballCollisions();
    image(ballimg, ball.ballX - 16, ball.ballY - 16); 

    for (let blockindex = 0; blockindex < blocks.length; blockindex++) {
        let block = blocks[blockindex];
        block.display();
    }

    platform.displayPlat();
    image(platimg, platform.PlatX - 32.5, platform.PlatY);

    if (keyIsDown(LEFT_ARROW)) {
        platform.left();
    }

    if (keyIsDown(RIGHT_ARROW)) {
        platform.right();
    }

    if(score == 24) {
        fill(255);
        text("Winner! Press space to restart", width/2 - 145, height/2);
    }
}

function ballCollisions() {
    if (dist(ball.ballX, ball.ballY, platform.PlatX, platform.PlatY + 12) < ball.diameter * 2) {
        ball.ballYSpeed = -ball.ballYSpeed;
    }

    for (let b = 0; b < blocks.length - 1; b++) {

        let block = blocks[b];

        if (dist(ball.ballX, ball.ballY, block.x + (block.width / 2), block.y + (block.height / 2)) < ball.diameter * 1.5 && block.visible) {
            ball.ballYSpeed = -ball.ballYSpeed;
            block.visible = false;
            score++;
        }
    }
    if (ball.ballX > width - ball.diameter || ball.ballX < ball.diameter) {
        ball.ballXSpeed = -ball.ballXSpeed;
    }
    if (ball.ballY < ball.diameter) {
        ball.ballYSpeed = - ball.ballYSpeed;
    }
    if (ball.ballY > height - ball.diameter) {
        fill(255);
        text("You lose! Press space to restart", width / 2 - 145, height / 2);
        gameLoss = true;
    }
}

function keyPressed() {
    if(gameStart == true && key == '1'){
        gameLoss = false;
        gameStart = false;
        hardMode = false;
        resetEasy();
        score = 0;

    }
    if(gameStart == true && key == '2'){
        gameLoss = false;
        gameStart = false;
        hardMode = true;
        resetHard();
        score = 0;
    }
    if(gameLoss == true && key == ' '){
        gameStart = true;
    }
    if(score == 24 && key == ' '){
        gameLoss = true; 
    }
}

function resetEasy() {

    for(let b = 0; b < blocks.length - 1; b++) {
        let block = blocks[b];
        block.visible = true; 
    }

    ball.ballXSpeed = 4;
    ball.ballYSpeed = -3.5;
    platform.PlatSpeed = 7;

    ball.resetBall();
    platform.resetPlat();
}

function resetHard() {
   
    for(let b = 0; b < blocks.length - 1; b++) {
        let block = blocks[b];
        block.visible = true; 
    }
    ball.resetBall();
    platform.resetPlat();

    ball.ballY = 240;
    ball.ballXSpeed = 6;
    ball.ballYSpeed = 5.25;
    ball.ballYSpeed = - ball.ballYSpeed;

    platform.PlatSpeed = 10;

   
}