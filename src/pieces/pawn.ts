import Piece from "./piece"
import type { Position, Color } from "./piece"

export class Pawn extends Piece{

    getColumnIndex():number {
        return 5;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 315;
    }

    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        const moves:Position[] = []
            return moves;
    }
}