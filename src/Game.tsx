import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import GameState from './engine'
function Game() {
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
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
        if (!game || !canvasRef.current
        ) return
        else {
            setInterval(() => {
                game.update()
            }, Math.floor(1000 / 60))

        }   
        let initialPos = []
        
        const files = ('abcdefgh').split('')

        const matrixPosToChessNote = (i:number, j:number) => {
            return files[i] + (8 - j)
        }
        
        const pxToMatrixPos = (x:number, y:number, game: GameState)=>{
            
            const boardRows = game.board.board.length;
            const boardCols = game.board.board[0]?.length ?? 0;

            const canvas_x = x * (canvasRef.current?.width ?? 1) / (canvasRef.current?.clientWidth ?? 1)
            const canvas_y = y * (canvasRef.current?.height ?? 1) / (canvasRef.current?.clientHeight ?? 1)

            const square_width = (canvasRef.current?.width ?? 1) / boardCols;
            const square_height = (canvasRef.current?.height ?? 1) / boardRows;

            let i = Math.floor(canvas_x / square_width);
            let j = Math.floor(canvas_y / square_height);
            
            i = Math.max(0, Math.min(boardCols, i));
            j = Math.max(0, Math.min(boardRows, j));

            return [i, j]   
        }
        const canvasEl = canvasRef.current!

        const rect = canvasEl.getBoundingClientRect()
        const handleUp = (e: PointerEvent) => {
            /*console.log("ptrUp", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            const [x, y] = pxToMatrixPos(e?.clientX - rect.left, e?.clientY - rect.top, game)
            console.log(matrixPosToChessNote(x,y))
            canvasEl.removeEventListener("pointermove", handleMove)
        }
        const handleMove = (e: PointerEvent) => {
            /*console.log("ptrMove", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
        }
        const handleDown = (e: PointerEvent) => {
            /*console.log("ptrDown", e?.clientX - rect.left
                , e?.clientY - rect.top
            )*/
            canvasEl.addEventListener("pointermove", handleMove)
        }
        canvasEl.addEventListener("pointerdown", handleDown)

        canvasEl.addEventListener("pointerup", handleUp)     
        


        return (() => {
            canvasEl.removeEventListener("pointerdown", handleDown)
            canvasEl.removeEventListener("pointermove", handleMove)
        })


    }, [game])




    return (
        <div>

            <canvas ref={canvasRef} style={{ background: "white" }} />

        </div>
    )
}

export default Game