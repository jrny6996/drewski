import type { Color, Position } from "./piece"
import Piece from "./piece";

export class Rook extends Piece{

    constructor(color:Color, x:number, y:number){
        super(color, x, y);
    }

    getPossibleMoves(board:(Piece | null)[][]): Position[] {
        const moves:Position[] = []
        //horizontal moves (x change)
        for(let i = 0; i < 8; i++){
            
                
        }
        return moves;
    }

    getColumnIndex():number {
        return 4;
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 250;
    }
    //rook white/black : x -> 250
        // black y -> 70
}