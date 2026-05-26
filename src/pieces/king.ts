import Piece from "./piece"
import type { Position, Color } from "./piece"
import { Queen } from "./queen"


export class King extends Queen{
    
    getColumnIndex():number {
        return 0;
    }

    constructor(color:Color, x:number, y:number){
        super(color, x, y);
    }
    
    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        const moves:Position[] = []
        return moves;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 0;
    }
    //kin
}