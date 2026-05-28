import React, { useEffect } from 'react'
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


    useEffect(() => {
        if (!game || !canvasRef.current) return

        let initialPos = []
        
        const files = ('abcdefgh').split('')

        const matrixPosToChessNote = (i:number, j:number) => {
            return files[i] + (8 - j)
        }
        
        const pxToMatrixPos = (px:number, py:number, game: GameState)=>{
            
            const boardRows = game.board.board.length;
            const boardCols = game.board.board[0]?.length ?? 0;

            const canvas_x = px * (canvasRef.current?.width ?? 1) / (canvasRef.current?.clientWidth ?? 1)
            const canvas_y = py * (canvasRef.current?.height ?? 1) / (canvasRef.current?.clientHeight ?? 1)

            const square_width = (canvasRef.current?.width ?? 1) / boardCols;
            const square_height = (canvasRef.current?.height ?? 1) / boardRows;

            let i = Math.floor(canvas_x / square_width);
            let j = Math.floor(canvas_y / square_height);
            
            i = Math.max(0, Math.min(boardCols - 1, i));
            j = Math.max(0, Math.min(boardRows - 1, j));

            return [i, j] as const
        }
        const canvasEl = canvasRef.current!

        const handleUp = (e: PointerEvent) => {
            
            const rect = canvasEl.getBoundingClientRect()

            /*console.log("ptrUp", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            const [i, j] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            console.log(matrixPosToChessNote(i, j))
            pieceRef.current?.setDestPosition(i, j, game.board.squareSize)
            
            if(selectedPosRef.current){
                const [fromI, fromJ] = selectedPosRef.current

                game.board.movePiece(fromI, fromJ, i, j)
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

            const [i, j] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            pieceRef.current?.setDestPosition(i, j, game.board.squareSize)
        }
        const handleDown = (e: PointerEvent) => {
            /*console.log("ptrDown", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            
            const rect = canvasEl.getBoundingClientRect()

            const [i, j] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            pieceRef.current = game.board.board[j][i]
            selectedPosRef.current = [i, j]
            console.log(pieceRef.current, matrixPosToChessNote(i, j))
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