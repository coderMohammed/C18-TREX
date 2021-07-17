class Ball{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;

    }
    display(){
        ellipseMode(RADIUS);
        /*Ellipse Has both horizontal and vertical radius

        */
        ellipse(this.x,this.y,this.radius,this.radius);
    }
}