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


    useEffect(()=>{
        if(!game) return
        else{
            setInterval(()=>{
                game.update()
            }, Math.floor(1000/60))

        }

    },[game])




    return (
        <div>

            <canvas ref={canvasRef} style={{ background: "white" }} />
            {/* {
                game && (
                    <div>
                        <button onClick={() => {
                            alert("hello")
                        }}>exists</button>
                    </div>
                )
            } */}
        </div>
    )
}

export default Game