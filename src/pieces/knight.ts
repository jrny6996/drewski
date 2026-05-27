import Piece from "./piece"
import type { Position, Color } from "./piece"

export class Knight extends Piece{
    
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