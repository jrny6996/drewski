export type Color = 'white' | 'black';
export type Position = {x:number, y:number}
abstract class Piece{

    readonly spriteWidth = 150;
    readonly spriteHeight = 150;


   color:Color;
    x:number;
    y:number;
    constructor(color:Color, x:number, y:number){
        this.color = color;
        this.x = x;
        this.y = y;
    }
    
    abstract getColumnIndex():number;
    abstract getPieceTypeOffset():number;
    
    protected getSpriteCoords(): { sx:number, sy:number }{
        const rowIndex = this.color === 'white' ? 0 : 1;
        const colIndex = this.getColumnIndex();
        const pieceOffset = this.getPieceTypeOffset();
       
        return { sx: colIndex * this.spriteWidth + pieceOffset, sy: rowIndex * this.spriteHeight };

    }

    draw(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D, squareSize:number){
//andrew
        let { sx, sy } = this.getSpriteCoords();
        
        const black_y_nudge = 70;
        
        if(this.color === 'black'){
            sy += black_y_nudge;
        }

        const sWidth = spriteEL.width / 6;
        const sHeight = spriteEL.height/ 2;
        const pieceSize = squareSize * 0.8;
        const offset = (squareSize - pieceSize) / 2;
        ctx.drawImage(
            spriteEL,
            sx, sy, sWidth, sHeight, 
            this.x * squareSize + offset, 
            this.y * squareSize + offset, 
            pieceSize, pieceSize
        );

    }
    setPosition(x:number, y:number): void{
        this.x = x;
        this.y = y;
    }
    abstract getPossibleMoves(board:(Piece | null)[][]) : Position[];


    protected boundsCheck(x:number, y:number): boolean{
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}
export default Piece
