import type { Position, Color } from "./piece"
import Piece from "./piece"

export class Bishop extends Piece{

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        super(color, i, j, squareSize, spriteEL, sWidth);
    }
    
    getColumnIndex():number {
        return 2;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 125;
    }

    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        const moves:Position[] = []
        return moves;
    }
}