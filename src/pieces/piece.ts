class Piece{
   
    x:number
    y:number
    constructor(x=0, y=0){
        this.x= x
        this.y =y
    }
    draw(spriteEL:HTMLImageElement, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
//andrew
    }
    move(){
        this.x = 100
        this.y = 100
    }
}

export default Piece