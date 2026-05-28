import { useEffect } from 'react'
import {Pawn} from './pieces/pawn';

import { useRef, useState } from 'react'
import GameState from './engine'
import Piece from './pieces/piece'
function Game() {
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
    const pieceRef = useRef<null | Piece>(null)
    const selectedPosRef = useRef<null | [number, number]>(null)
    const [game, setGame] = useState<null | GameState>(null)


    useEffect(() => {
        if (canvasRef.current === null) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) {
            alert("Error: Could not initialize HTML canvas")
            return
        }
        ctx.fillStyle = "blue"
        const engine = new GameState(canvas, ctx)
        // engine.update()
        setGame(engine)

    }, [])
    
    const files = ('abcdefgh').split('')

    // matrix coordinates use { column, row } so they can be converted to readable chess notation.
    const matrixPosToChessNote = (column:number, row:number) => {
        return files[column] + (8 - row)
    }

    useEffect(() => {
        if (!game || !canvasRef.current) return      
        
        const pxToMatrixPos = (px:number, py:number, game: GameState)=>{
            
            const boardRows = game.board.board.length;
            const boardCols = game.board.board[0]?.length ?? 0;

            const canvas_x = px * (canvasRef.current?.width ?? 1) / (canvasRef.current?.clientWidth ?? 1)
            const canvas_y = py * (canvasRef.current?.height ?? 1) / (canvasRef.current?.clientHeight ?? 1)

            const square_width = (canvasRef.current?.width ?? 1) / boardCols;
            const square_height = (canvasRef.current?.height ?? 1) / boardRows;

            let column = Math.floor(canvas_x / square_width);
            let row = Math.floor(canvas_y / square_height);
            
            column = Math.max(0, Math.min(boardCols - 1, column));
            row = Math.max(0, Math.min(boardRows - 1, row));

            return [column, row] as const
        }
        const canvasEl = canvasRef.current!

        const handleUp = (e: PointerEvent) => {
            
            const rect = canvasEl.getBoundingClientRect()

            /*console.log("ptrUp", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            const [column, row] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            
            console.log(matrixPosToChessNote(column, row))
            pieceRef.current?.setDestPosition(column, row, game.board.squareSize)

           
            
            if(selectedPosRef.current){
                const [fromColumn, fromRow] = selectedPosRef.current
                
                if (fromColumn != column || fromRow != row){ //piece changes pos
                    
                    if(pieceRef.current && !pieceRef.current?.hasMoved){
                        pieceRef.current.hasMoved = true;
                    }
                    

                    game.board.movePiece(fromColumn, fromRow, column, row)
                }
            }
            if(pieceRef.current) {
                console.log(pieceRef.current)
            }
            pieceRef.current = null
            selectedPosRef.current = null
            game.update()
            
            
            canvasEl.removeEventListener("pointermove", handleMove)
        }
        const handleMove = (e: PointerEvent) => {
            /*console.log("ptrMove", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            const rect = canvasEl.getBoundingClientRect()

            const [column, row] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            pieceRef.current?.setDestPosition(column, row, game.board.squareSize)
        }
        const handleDown = (e: PointerEvent) => {
            /*console.log("ptrDown", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            
            const rect = canvasEl.getBoundingClientRect()
            const [column, row] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            
            pieceRef.current = game.board.board[row][column]
            selectedPosRef.current = [column, row]
            
            if (pieceRef.current) {

                const moves = pieceRef.current.getPossibleMoves(game.board.board)
                console.log(moves)

                let moveNotes:string[] = []
                
                for (const move of moves){
                    moveNotes.push(matrixPosToChessNote(move.i, move.j))

                }
                console.log( moveNotes )
            }
            
            //console.log(matrixPosToChessNote(column, row))
            canvasEl.addEventListener("pointermove", handleMove)
            
        }
        canvasEl.addEventListener("pointerdown", handleDown)

        canvasEl.addEventListener("pointerup", handleUp)     
        


        return (() => {
            canvasEl.removeEventListener("pointerdown", handleDown)
            canvasEl.removeEventListener("pointermove", handleMove)
            canvasEl.removeEventListener("pointerup", handleUp)
        })


    }, [game])




    return (
        <div>

            <canvas ref={canvasRef} style={{ background: "white" }} />

        </div>
    )
}

export default Game