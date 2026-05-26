import type Piece from "./pieces/piece"

class GameState {
    spriteMapUrl: string
    spriteEl:HTMLImageElement
    canvas:HTMLCanvasElement
    ctx:CanvasRenderingContext2D
    x:number = 0
    y:number = 0
    pieces:Piece[] = []

    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D, spriteMapUrl = "/chess.png") {
        this.spriteMapUrl = spriteMapUrl
        this.canvas = canvas
        this.canvas.height= 720
        this.canvas.width = 1280
        this.ctx = ctx
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.spriteEl = document.createElement("img") as HTMLImageElement
        this.spriteEl.src =this.spriteMapUrl
    }

    update(){
        // console.log(this.spriteEl)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                // this.ctx.drawImage(this.spriteEl, this.x, this.y)
                // this.x ++
                //   this.ctx.drawImage(this.spriteEl, 0, 200)
                // console.log(this.ctx)

    }
}


export default GameState