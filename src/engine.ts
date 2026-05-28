import Board from "./pieces/ChessBoard"

type ServerPosition = { i: number; j: number } | { x: number; y: number } | [number, number]

type BasicMove = {
    from?: ServerPosition
    to?: ServerPosition
    fromI?: number
    fromJ?: number
    toI?: number
    toJ?: number
}

type ServerMove = BasicMove | {
    move: BasicMove
}

class GameState {
    spriteMapUrl: string
    spriteEl:HTMLImageElement
    canvas:HTMLCanvasElement
    ctx:CanvasRenderingContext2D
    x:number = 0
    y:number = 0
    board:Board
    socket: WebSocket | null = null

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

    attachSocket(socket: WebSocket): void {
        this.socket = socket;
        this.socket.onmessage = (event: MessageEvent<string>) => {
            this.handleServerMessage(event);
        };
    }
    
    private handleServerMessage(event: MessageEvent<string>): void {
        try {
            const payload = JSON.parse(event.data) as ServerMove;
            this.applyServerMove(payload);
        } catch (error) {
            console.error('Failed to parse server message:', event.data, error);
        }
    }

    private parseServerPosition(position: ServerPosition | undefined): [number, number] | null {
        if (!position) return null;

        if (Array.isArray(position)) {
            const [i, j] = position;
            if (Number.isFinite(i) && Number.isFinite(j)) {
                return [i, j];
            }
            return null;
        }

        if ('i' in position && 'j' in position) {
            return [position.i, position.j];
        }

        if ('x' in position && 'y' in position) {
            return [position.x, position.y];
        }

        return null;
    }

    

    private applyServerMove(payload: ServerMove): void {
        
        const move = 'move' in payload ? payload.move : payload;

        const from = this.parseServerPosition(move.from)
            ?? (typeof move.fromI === 'number' && typeof move.fromJ === 'number'
                ? this.parseServerPosition({ i: move.fromI, j: move.fromJ })
                : null);

        const to = this.parseServerPosition(move.to)
            ?? (typeof move.toI === 'number' && typeof move.toJ === 'number'
                ? this.parseServerPosition({ i: move.toI, j: move.toJ })
                : null);

        if (!from || !to) {
            console.warn('Server move payload missing valid coordinates', payload);
            return;
        }

        const [fromI, fromJ] = from;
        const [toI, toJ] = to;

        this.board.movePiece(fromI, fromJ, toI, toJ);
       
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