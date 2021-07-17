class Box{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y= y;
        this.width = width;
        this.height =height;
        this.color = color;
        this.vx = 2;
    }

    display(){
        fill(this.color);
        rectMode(CENTER);
        rect(this.x,this.y,this.width,this.height);
    }

    move(){
        this.x += this.vx;
    }

    changeVX(speed){
        this.vx = speed;
    }
}