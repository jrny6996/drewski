import type { Color, Position } from "./piece"
import Piece from "./piece";

export class Rook extends Piece{

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        super(color, i, j, squareSize, spriteEL, sWidth);
    }

    getPossibleMoves(board:(Piece | null)[][]): Position[] {
        const moves:Position[] = []
        //horizontal moves (i / column change)
        for(let col = 0; col < 8; col++){
            
                
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