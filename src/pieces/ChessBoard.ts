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
    }

    initPieces(spriteEL:HTMLImageElement){
        this.b_init(spriteEL);
    }

    private b_new(){
        for (let j = 0; j < 8; j++){
            this.board[j] = new Array(8).fill(null);
        }
    }

    private b_init(spriteEL:HTMLImageElement){
        const sWidth = spriteEL.width / 6;
        //Black init
        this.board[0][0] = new Rook('black', 0, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][1] = new Knight('black', 1, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][2] = new Bishop('black', 2, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][3] = new Queen('black', 3, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][4] = new King('black', 4, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][5] = new Bishop('black', 5, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][6] = new Knight('black', 6, 0, this.squareSize, spriteEL, sWidth);
        this.board[0][7] = new Rook('black', 7, 0, this.squareSize, spriteEL, sWidth);
        for (let i = 0; i < 8; i++){
            this.board[1][i] = new Pawn('black', i, 1, this.squareSize, spriteEL, sWidth);
        }
        //White Init
        this.board[7][0] = new Rook('white', 0, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][1] = new Knight('white', 1, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][2] = new Bishop('white', 2, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][3] = new Queen('white', 3, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][4] = new King('white', 4, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][5] = new Bishop('white', 5, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][6] = new Knight('white', 6, 7, this.squareSize, spriteEL, sWidth);
        this.board[7][7] = new Rook('white', 7, 7, this.squareSize, spriteEL, sWidth);
        for (let i = 0; i < 8; i++){
            this.board[6][i] = new Pawn('white', i, 6, this.squareSize, spriteEL, sWidth);
        }
    }

    staticRender(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        for(let j = 0; j < 8; j++){
            for(let i = 0; i < 8; i++){
                const piece = this.board[j][i];
                if(piece){
                    piece.draw(spriteEL, ctx);
                }
            }
        }
    }
    movingRender(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        for(let boardJ = 0; boardJ < 8; boardJ++){
            for(let boardI = 0; boardI < 8; boardI++){
                const piece = this.board[boardJ][boardI];
                if(piece){
                    piece.draw(spriteEL, ctx);
                }
            }
        }
    }
    render(spriteEL:HTMLImageElement, ctx:CanvasRenderingContext2D){
        for(let j = 0; j < 8; j++){
            for(let i = 0; i < 8; i++){
                const isLightSquare = (i + j) % 2 === 0;
                ctx.fillStyle = isLightSquare ? 'white' : 'green';
                ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);

            }
        }
        this.staticRender(spriteEL, ctx);
    }

    movePiece(fromI:number, fromJ:number, toI:number, toJ:number){
        if (fromI === toI && fromJ === toJ) return; //no move
        const piece = this.board[fromJ][fromI];
        if(piece){
            piece.setPosition(toI, toJ);
            this.board[fromJ][fromI] = null;
            this.board[toJ][toI] = piece;
            
        }
    }

    
}

export default ChessBoard