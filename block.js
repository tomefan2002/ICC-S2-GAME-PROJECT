class Block {
    constructor(column,row){
        this.column = column;
        this.row = row;
        this.width = 75;
        this.height = 35; 
        this.x = 0;
        this.y= 0;
        this.visible = true;
        this.blockFillR = 3; 
        this.blockFillG = 244;
        this.blockFillB = 252;
    } 

    display(){
        if(this.visible){
            stroke(1);
            strokeWeight(3);
            fill(this.blockFillR, this.blockFillG, this.blockFillB, 70);
            rect(this.width * this.column, this.height * this.row, this.width, this.height);
            this.x=this.width * this.column;
            this.y=this.height * this.row;
        }
    }
}