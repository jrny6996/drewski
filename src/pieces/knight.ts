import Piece from "./piece"
import type { Position, Color } from "./piece"

export class Knight extends Piece{

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        super(color, i, j, squareSize, spriteEL, sWidth);
    }
    
    getColumnIndex():number {
        return 3;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 200;
    }

    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        const moves:Position[] = []
        return moves;
    }
}