import { Bishop } from "./bishop";
import { Rook } from "./rook";
import { Knight } from "./knight";
import { Queen } from "./queen";
import { King } from "./king";
import Piece from "./piece";
import { Pawn } from "./pawn";

export class ChessBoard{
    
    public board:(Piece | null)[][] = [];
    public squareSize:number= 0;
    
    constructor(canvasWidth:number){
        this.squareSize = canvasWidth / 8;
        this.b_new();
        this.b_init();
    }

    private b_new(){
        for (let i = 0; i < 8; i++){
            this.board[i] = new Array(8).fill(null);
        }
    }

    private b_init(){
        //Black init
        this.board[0][0] = new Rook('black', 0, 0);
        this.board[0][1] = new Knight('black', 1, 0);
        this.board[0][2] = new Bishop('black', 2, 0);
        this.board[0][3] = new Queen('black', 3, 0);
        this.board[0][4] = new King('black', 4, 0);
        this.board[0][5] = new Bishop('black', 5, 0);
        this.board[0][6] = new Knight('black', 6, 0);
        this.board[0][7] = new Rook('black', 7, 0);
        for (let i = 0; i < 8; i++){
            this.board[1][i] = new Pawn('black', i, 1);
        }
        //White Init
        this.board[7][0] = new Rook('white', 0, 7);
        this.board[7][1] = new Knight('white', 1, 7);
        this.board[7][2] = new Bishop('white', 2, 7);
        this.board[7][3] = new Queen('white', 3, 7);
        this.board[7][4] = new King('white', 4, 7);
        this.board[7][5] = new Bishop('white', 5, 7);
        this.board[7][6] = new Knight('white', 6, 7);
        this.board[7][7] = new Rook('white', 7, 7);
        for (let i = 0; i < 8; i++){
            this.board[6][i] = new Pawn('white', i, 6);
        }
    }

    staticRender(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        for(let row = 0; row < 8; row++){
            for(let col = 0; col < 8; col++){
                const piece = this.board[row][col];
                if(piece){
                    piece.draw(spriteEL, ctx, this.squareSize);
                }
            }
        }
    }
    movingRender(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D,  x:number, y:number){
        for(let row = 0; row < 8; row++){
            for(let col = 0; col < 8; col++){
                const piece = this.board[row][col];
                if(piece){
                    piece.movingPieceDraw(spriteEL, ctx, this.squareSize, x, y);
                }
            }
        }
    }
    render(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        for(let row = 0; row < 8; row++){
            for(let col = 0; col < 8; col++){
                const isLightSquare = (row + col) % 2 === 0;
                ctx.fillStyle = isLightSquare ? 'white' : 'green';
                ctx.fillRect(col * this.squareSize, row * this.squareSize, this.squareSize, this.squareSize);

            }
        }
        this.staticRender(spriteEL, ctx);
    }

    
}

export default ChessBoard