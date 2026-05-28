export type Color = 'white' | 'black';
/** i = column (file), j = row (rank) */
export type Position = {i:number, j:number}
abstract class Piece{

    readonly spriteWidth = 150;
    readonly spriteHeight = 150;


   color:Color;
    /** column (file) */
    i:number;
    /** row (rank) */
    j:number;
    hasMoved:boolean;
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
        this.hasMoved = false;
        
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
        this.j = sx
        this.i = sy
    }
    

    draw(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        if (!spriteEL.complete || spriteEL.naturalWidth === 0) return;

        const sWidth = spriteEL.width / 6;
        const sHeight = spriteEL.height / 2;

        let { sx, sy } = this.getSpriteCoords();

        const black_y_nudge = 70;
        if (this.color === 'black') {
            sy += black_y_nudge;
        }

        ctx.drawImage(
            spriteEL,
            sx, sy, sWidth, sHeight,
            this.dx,
            this.dy,
            this.pieceSize, this.pieceSize
        );

    }
    setPosition(i:number, j:number): void{
        this.i = i;
        this.j = j;
    }
    setDestPosition(i:number, j:number, squareSize:number): void{
        this.dx = i * squareSize + this.offset;
        this.dy = j * squareSize + this.offset;
    }
    abstract getPossibleMoves(board:(Piece | null)[][]) : Position[];


    protected boundsCheck(i:number, j:number): boolean{
        return i >= 0 && i < 8 && j >= 0 && j < 8;
    }

    protected generateSlidingMoves(piece:Piece, board:(Piece | null)[][], directions:number[][], maxDistance?:number): Position[]{
        const moves:Position[] = []
        const row = piece.j;
        const col = piece.i;

        for (const [rowDelta, colDelta] of directions){
            let nextRow = row + rowDelta;
            let nextCol = col + colDelta;
            
            while (this.boundsCheck(nextRow, nextCol)){
                const target = board[nextRow][nextCol];
                if (target === null){
                    moves.push({ i: nextCol, j: nextRow });
                } else {
                    if (target.color !== piece.color){
                        moves.push({ i: nextCol, j: nextRow });
                    }
                    break;
                }
                if(maxDistance) break; //for king
                nextRow += rowDelta;
                nextCol += colDelta;
            }
        }

        return moves;
    }

    protected generateJumpMoves(piece:Piece, board:(Piece | null)[][], directions:number[][]): Position[]{
        const moves:Position[] = []
        const row = piece.j;
        const col = piece.i;

        for (const [rowDelta, colDelta] of directions){
            const nextRow = row + rowDelta;
            const nextCol = col + colDelta;
            
            if (this.boundsCheck(nextRow, nextCol)){
                const target = board[nextRow][nextCol];
                if (target === null || target.color !== piece.color){
                    moves.push({ i: nextCol, j: nextRow });
                }
            }
        }
        return moves;
    }
    protected generatePawnMoves(piece: Piece, board: (Piece | null)[][], forwardDir: number): Position[] {

        const moves: Position[] = [];
        const row = piece.j;
        const col = piece.i;

        const nextRow = row + forwardDir;

        if (this.boundsCheck(nextRow, col) && board[nextRow][col] === null) {

            moves.push({ i: col, j: nextRow });

            const doubleRow = row + (2 * forwardDir);

            if (
                !piece.hasMoved &&
                this.boundsCheck(doubleRow, col) &&
                board[doubleRow][col] === null
            ) {
                moves.push({ i: col, j: doubleRow });
            }
        }

        for (const sideDir of [-1, 1]) {

            const captureRow = row + forwardDir;
            const captureCol = col + sideDir;

            if (this.boundsCheck(captureRow, captureCol)) {

                const target = board[captureRow][captureCol];

                if (target !== null && target.color !== piece.color) {
                    moves.push({ i: captureCol, j: captureRow });
                }
            }
        }

        return moves;
    }

}
export default Piece
