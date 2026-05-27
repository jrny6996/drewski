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

    constructor(color:Color, x:number, y:number){
        super(color, x, y);
    }

    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        const moves:Position[] = []
        return moves;
    }
}