export type Color = 'white' | 'black';
export type Position = {x:number, y:number}
abstract class Piece{

    readonly spriteWidth = 150;
    readonly spriteHeight = 150;


   color:Color;
    i:number;
    j:number;
    dx:number;
    dy:number;
    sWidth:number;
    sHeight:number;
    pieceSize:number;
    offset:number;

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        this.color = color;
        this.i = i;
        this.j = j;
        
        this.sWidth = sWidth;
        this.sHeight = spriteEL.height/ 2;
        
        this.pieceSize = squareSize * .95;
        this.offset = (squareSize - this.pieceSize) / 2;
        
        this.dx = i * squareSize + this.offset
        this.dy = j * squareSize + this.offset
    }
    
    abstract getColumnIndex():number;
    abstract getPieceTypeOffset():number;
    
    protected getSpriteCoords(): { sx:number, sy:number }{
        const rowIndex = this.color === 'white' ? 0 : 1;
        const colIndex = this.getColumnIndex();
        const pieceOffset = this.getPieceTypeOffset();
       
        return { sx: colIndex * this.spriteWidth + pieceOffset, sy: rowIndex * this.spriteHeight };

    }
    setSpriteCoords(sx:number, sy:number){
        this.i = sx
    }
    

    draw(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        let { sx, sy } = this.getSpriteCoords();

        const black_y_nudge = 70;
        if (this.color === 'black') {
            sy += black_y_nudge;
        }

        ctx.drawImage(
            spriteEL,
            sx, sy, this.sWidth, this.sHeight, 
            this.dx , 
            this.dy , 
            this.pieceSize, this.pieceSize
        );

    }
    setPosition(x:number, y:number): void{
        this.i = x;
       this.j = y;
    }
    abstract getPossibleMoves(board:(Piece | null)[][]) : Position[];


    protected boundsCheck(x:number, y:number): boolean{
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}
export default Piece
