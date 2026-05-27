import Board from "./pieces/ChessBoard"
class GameState {
    spriteMapUrl: string
    spriteEl:HTMLImageElement
    canvas:HTMLCanvasElement
    ctx:CanvasRenderingContext2D
    x:number = 0
    y:number = 0
    board:Board

    constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D, spriteMapUrl = "/sprites.png") {
        this.spriteMapUrl = spriteMapUrl
        this.canvas = canvas
        this.canvas.height= 720
        this.canvas.width = 720
        this.ctx = ctx
        
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.spriteEl = new Image()

        this.board = new Board(this.canvas.width);
        this.spriteEl.src = this.spriteMapUrl
        this.spriteEl.onload = () => {
            this.board.initPieces(this.spriteEl);
            this.startRenderLoop();
        }
    }

    private startRenderLoop(){
        const loop = () => {
            this.update();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    update(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.board.render(this.spriteEl, this.ctx);
    }
   
                // this.ctx.drawImage(this.spriteEl, this.x, this.y)
                // this.x ++
                //   this.ctx.drawImage(this.spriteEl, 0, 200)
                // console.log(this.ctx)

    
}


export default GameState