import Piece from "./piece"
import type { Position, Color } from "./piece"
import { Bishop } from "./bishop"

export class Queen extends Bishop{
    
    getColumnIndex():number {
        return 1;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 65;
    }

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        super(color, i, j, squareSize, spriteEL, sWidth);
    }

    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        const moves:Position[] = []
        return moves;
    }
}