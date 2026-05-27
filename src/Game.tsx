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
        const pxToMatrixPos = (x:number, y:number)=>{
            let i =0
            let j = 0
            return [i, j]
        }
        const canvasEl = canvasRef.current!

        const rect = canvasEl.getBoundingClientRect()

        const handleMove = (e: PointerEvent) => {
            console.log("ptrMove", e?.clientX - rect.left
                , e?.clientY - rect.top
            )
        }
        const handleDown = (e: PointerEvent) => {
            console.log("ptrDown", e?.clientX - rect.left
                , e?.clientY - rect.top
            )
            canvasEl.addEventListener("pointermove", handleMove)
        }
        canvasEl.addEventListener("pointerdown", handleDown)

        canvasEl.addEventListener("pointerup", () => {
            canvasEl.removeEventListener("pointermove", handleMove)

        })


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