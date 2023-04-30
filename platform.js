class Platform { // creates and names my Platform class ready to be used in sketch.js to draw my platform and gives it its left & right movement functions as well as the resetPlat() function
  constructor() { // creates and intialises an instance of my Platform object
    this.PlatX = PlatX; // creates a new variable and sets its value to my PlatX variable from sketch.js (which itself had the value of '(600 / 2) - 32.5')
    this.PlatY = PlatY; // creates a new variable and sets its value to my PlatY variable from sketch.js (which itself had the value of '600 * 0.75')
    this.PlatW = 75; // assigns the value of 75 to my Platform object's width 
    this.PlatH = 18; // assigns the value of 18 to my Platform object's height 
    this.PlatSpeed = 7; // assigns the value of 7 to my Platform object's speed
    this.PlatFillR = 3; // assigns value of 3 to my Platform object's 'Red-channel' with combines with the Green and Blue channels to create an RGB fill colour
    this.PlatFillG = 244; // assigns value of 244 to my Platform object's 'Green-channel' with combines with the Red and Blue channels to create an RGB fill colour
    this.PlatFillB = 252; // assigns value of 252 to my Platform object's 'Blue-channel' with combines with the Green and Red channels to create an RGB fill colour
  }

  displayPlat() { // a function used to display my Platform object in sketch.js
    fill(this.PlatFillR, this.PlatFillG, this.PlatFillB);
    rect(this.PlatX, this.PlatY, this.PlatW, this.PlatH); // the platform itself, a rectangle with values of 'PlatX, Y, W & H' ((600 / 2) - 32.5, 600 * 0.75, 75, 18)
  }

  left() { // a function to move my Platform object along the X-axis
    if (this.PlatX < 0) { // checks if my Platform object is going off the left of the canvas 
      this.PlatX == 0; // if it is it sets the Platform objects X location to 0, therefore stopping it moving any further left if the left arrow key is held 
    } else { // if X is equal to anything other than 0 it can move left
      this.PlatX -= this.PlatSpeed; // moves the platform left by subtracting 7px from its X value every frame 
    }
  }

  right() { // does the exact opposite of the 'left()' function. the 525 number is because my Platform object is drawing from the top-left corner and it has a width of 75px so it needs to stop 75px early to not go off screen
    if (this.PlatX >= 525) {
      this.PlatX == 525;
    } else {
      this.PlatX += this.PlatSpeed;
    }
  }

  resetPlat() { // a function to reset the Platform objects position on the canvas when the user presses the '1' or '2' keys  
    this.PlatX = PlatX;
    this.PlatY = PlatY;
  }
}

