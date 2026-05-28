import Piece from "./piece"
import type { Position, Color } from "./piece"

export class Pawn extends Piece{

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        super(color, i, j, squareSize, spriteEL, sWidth);
    }

    getColumnIndex():number {
        return 5;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 315;
    }

    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        /*return this.generatePawnMoves(
            this,
            board,
        )*/
       console.log(board)
       return [];
    }
}