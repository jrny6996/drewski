import Piece from "./piece"
import type { Position, Color } from "./piece"
import { Queen } from "./queen"


export class King extends Queen{
    
    getColumnIndex():number {
        return 0;
    }

    constructor(color:Color, i:number, j:number, squareSize:number, spriteEL:HTMLImageElement, sWidth:number){
        super(color, i, j, squareSize, spriteEL, sWidth);
    }
    
    getPossibleMoves(board:(Piece | null)[][]):Position[] {
        return this.generateSlidingMoves(
            this,
            board,
            [ [1, 1], [-1, -1], [-1, 1], [1, -1], [1, 0], [-1, 0], [0, 1], [0, -1] ],
            1
            
        )
    }
    getPieceTypeOffset():number{ //x offset for sprite sheet
        return 0;
    }
    //kin
}