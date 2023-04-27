class Platform {
  constructor() {
    this.PlatX = PlatX;
    this.PlatY = PlatY;
    this.PlatSpeed = 7;
    this.PlatFillR = 3; 
    this.PlatFillG = 244;
    this.PlatFillB = 252;
  }

  displayPlat() {
    fill(this.PlatFillR, this.PlatFillG, this.PlatFillB);
    rect(this.PlatX - 32.5, this.PlatY, 75, 18);
  }

  left() {
    if(this.PlatX < 40) {
      this.PlatX==0;
    } else {
      this.PlatX-=this.PlatSpeed;
    }
  }

  right() {
    if(this.PlatX >= 550) {
      this.PlatX==525;
    } else {
      this.PlatX+=this.PlatSpeed;
    }
  }

  resetPlat() {
    this.PlatX = PlatX;
    this.PlatY = PlatY;
  }

  resetPlatHard() {
    this.PlatX = PlatX;
    this.PlatY = PlatY;
  }
}

