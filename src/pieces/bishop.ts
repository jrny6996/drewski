import type { Position, Color } from "./piece"
import Piece from "./piece"

export class Bishop extends Piece{
    
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