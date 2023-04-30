class Block { // creates and names my Block class ready to be used in sketch.js and be added to my 'blocks' array to be drawn  
    constructor(column, row) { // creates and intializes an instance of one of my Block object's with values of 'column' and 'row' (both their values increase per iteration of the for loop in setup() in sketch.js which in turn draws the Block object's
        this.brickbg = brickbg; // assigned the value of 'brickbg' from sketch.js (brick.png)
        this.column = column; // taken from the for loop in setup() its value increases by 1 unit every iteration to be used to increase each block drawn's X position by the width of a Block object to create a 3*8 'grid'
        this.row = row; // taken from the for loop in setup() its value increases by 1 unit every iteration to be used to increase each block drawn's Y position by the height of a Block object to create a 3*8 'grid'
        this.width = 75; // assigns a value of 75 to each Block object's width (canvas = 8 blocks wide = 75px wide)
        this.height = 35; // assigns a value of 35 to each Block object's height
        this.x = 0; // sets the very first Block object in my 'blocks' array's X value to 0
        this.y = 0; // sets the very first Block object in my 'blocks' array's Y value to 0
        this.visible = true;
        this.blockFillR = 3;
        this.blockFillG = 244;
        this.blockFillB = 252;
    }

    display() {
        if (this.visible) { // this gets set to false when the Ball object collides with a Block which effectively 'hides' the block until it gets reset in 'resetEasy()' and 'resethard()' in sketch.js
            stroke(1);
            strokeWeight(5);
            fill(this.blockFillR, this.blockFillG, this.blockFillB);
            rect(this.width * this.column, this.height * this.row, this.width, this.height); // creates each Block object, X and Y values are set to 'this.width * this.column' and 'this.height * this.row' (the very first Block object in the array therefore has a X & Y position of 0,0 because column and row's values both start at 0, 75*0 & 35*0 = 0)). per every iteration of the for loop in 'setup()' in sketch.js the value of column and row increases by 1 unit and therefore each Block object in the array's position is different and decided by its index (e.g. the last block in the array's positon equals 600,105 because 'this.width' * 8 (columns highest value) = 600 & 'this.height' * 3 (row's highest value) = 105)
            image(this.brickbg, this.width * this.column, this.height * this.row); // overlays my block background image over each individual object
            this.x = this.width * this.column; // used for finding X position each Block object in my 'blocks' array to later be used in sketch.js to detect collisions between the ball and individual blocks  
            this.y = this.height * this.row; // used for finding Y position each Block object in my 'blocks' array to later be used in sketch.js todetect collisions between the ball and individual blocks
        }
    }
}