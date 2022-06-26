import { Api } from './types';
import { Coords, Store, Difficulties, BoardSizes } from './types';

class Food {
    constructor(api) { 
        // generate a random location for the food
        // get a random empty tile from the empty array returned from api.getBoardState()
        const empty = api.getBoardState().empty
        const random = Math.floor(Math.random() * empty.length)
        this.body.x = empty[random].x
        this.body.y = empty[random].y
        this.draw()
    }
    public element: HTMLElement;
    public tile: HTMLElement;
    public body: Coords = { x: 0, y: 0 };
    public draw () {
        // draw the food
        const food = document.createElement('div')
        food.classList.add('food')
        // append it to the correct tile
        Array.from(api.store.grid.children).forEach( tile => {
            if (parseInt(tile.dataset.x) == this.body.x && parseInt(tile.dataset.y) == this.body.y) {
                const _tile = tile as HTMLElement
                _tile.appendChild(food)
                this.tile = _tile
                this.element = food
            }
        }) //.appendChild(food)
    }
    public remove() {
        if (this?.tile?.children?.[0]?.remove)
            this.tile.children[0].remove()
    }
}

class Snake {
    public body: Array<Coords>;
    //velocity for x and y direction of snake movement
    public vx: number = 0;
    public vy: number = -1;
    public changingDirection: Boolean = false
    constructor(
        api: Api
    ) {
        // initialize snake body in middle of grid
        const tiles: NodeListOf<Element> = api.store.grid.querySelectorAll(`.tile-class`)
        const gridSize: number = Math.sqrt(tiles.length)
        const middleTile: number = Math.floor(gridSize / 2)
        this.body = [{ x: middleTile, y: gridSize - 3 }, { x: middleTile, y: gridSize - 2 }, { x: middleTile, y: gridSize - 1 }]
        this.draw(api)
    }

    public remove(api) {
        // remove the snake from the grid
        this.body.forEach((bodyPart: Coords) => {
            const selector: string = `.tile-class[data-x="${bodyPart.x}"][data-y="${bodyPart.y}"]`
            const tile: HTMLElement = api.store.grid.querySelector(selector)
            if (tile)
                Array.from(tile.children).forEach(el => el.remove())
        })
    }

    public draw(api: Api) {
        this.body.forEach((bodyPart: Coords) => {
            const body: HTMLElement = document.createElement('div')
            body.classList.add('snake-class')
            // render the snake body part on the grid in the correct tile
            const selector: string = `.tile-class[data-x="${bodyPart.x}"][data-y="${bodyPart.y}"]`
            const tile: HTMLElement = api.store.grid.querySelector(selector)
            tile.appendChild(body)

        })
    }
    public move(api: Api) {
        // move the snake by adding the velocity to the body parts x and y coordinates
        // move the snake, add a head and pop the tail if not eating food
        const head: Coords = {x: this.body[0].x + this.vx, y: this.body[0].y + this.vy}
        // add the head to the body
        this.body.unshift(head)
        // add the new head to the tile
        const selector: string = `.tile-class[data-x="${head.x}"][data-y="${head.y}"]`
        const bodyPart = document.createElement('div')
        bodyPart.classList.add('snake-class')
        try {
        api.store.grid.querySelector(selector).appendChild(bodyPart)
        } catch (e) {
            // user tried to go out of bounds
            api.setGameOver(api)
            api.mainLoop()
        }
        // check if the snake has eaten food
        if (head.x == api.store.food.body.x && head.y == api.store.food.body.y) {
            api.beep(api)
            api.store.score += 1
            if (api.store.score > 20) document.querySelector(`#message`).innerHTML = `You're getting good at this!`
            if (api.store.score > 25) document.querySelector(`#message`).innerHTML = `You are a snake boss!`
            if (api.store.score > 30) document.querySelector(`#message`).innerHTML = `You are amazing!`
            if (api.store.score > 35) document.querySelector(`#message`).innerHTML = `Unbelievable!`
            if (api.store.score > 40) document.querySelector(`#message`).innerHTML = `Ridiculous!`
            if (api.store.score > 41) document.querySelector(`#message`).innerHTML = `How do you do this?!`
            if (api.store.score > 42) document.querySelector(`#message`).innerHTML = `I am really impressed..`
            if (api.store.score > 43) document.querySelector(`#message`).innerHTML = `don't let me distract you..`
            if (api.store.score > 45) document.querySelector(`#message`).innerHTML = `You are probably cheating!`
            if (api.store.score > 50) document.querySelector(`#message`).innerHTML = `I've been too easy on you!`
            if (api.store.score > 60) document.querySelector(`#message`).innerHTML = `You are definitely cheating!`
            if (api.store.score > 61) document.querySelector(`#message`).innerHTML = `Just kidding, you've got skill!`
            if (api.store.score > 100) document.querySelector(`#message`).innerHTML = `Congrats, you are a legend!`
            document.getElementById(`score`).innerHTML = `Score: ${api.store.score}`
            // remove old food element from tile generate a new food
            api.store.food.remove()
            api.store.food = new Food(api)

        } else {
            // remove the tail from the tile grid
            const tile = api.store.grid.querySelector(`.tile-class[data-x="${this.body[this.body.length - 1].x}"][data-y="${this.body[this.body.length - 1].y}"]`)
            tile.children[0].remove()
            // pop the tail
            this.body.pop()
        }
        // check if the snake has hit the wall or itself
        this.checkCollision(api)
    }
    public checkCollision(api: Api) {
        // check if the snake has hit the wall or itself
        const head: Coords = this.body[0]
        const tiles: NodeListOf<Element> = api.store.grid.querySelectorAll(`.tile-class`)
        const gridSize: number = Math.sqrt(tiles.length)
        // check if the snake has hit the wall
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            api.setGameOver(api)
            api.mainLoop()
        }
        // check if the snake has hit itself
        this.body.forEach((bodyPart: Coords, index: number) => {
            if (index > 0) {
                if (head.x == bodyPart.x && head.y == bodyPart.y) {
                    api.setGameOver(api)
                    api.mainLoop(api)
                }
            }
        }
        )
    }
    public changeDirection(event: Event | Object) {
        if ('preventDefault' in event) event.preventDefault()
        const keyPress = event.keyCode
        const { KEYS } = window.api.constants
        // determine current direction
        const snake = window.api.store.snake
        const goingUp = snake.vy == -1
        const goingDown = snake.vy == 1
        const goingLeft = snake.vx == -1
        const goingRight = snake.vx == 1

        // the snake cannot reverse direction
        
        // change the velocity of the snake
        // prevent the snake from changing direction twice in a row
        if (!snake.changingDirection) {
            snake.changingDirection = true
            if (keyPress == KEYS.DOWN && !goingUp) {
                snake.vx = 0
                snake.vy = 1
            }
            if (keyPress == KEYS.UP && !goingDown) {
                snake.vx = 0
                snake.vy = -1
            }
            if (keyPress == KEYS.LEFT && !goingRight) {
                snake.vx = -1
                snake.vy = 0
            }
            if (keyPress == KEYS.RIGHT && !goingLeft) {
                snake.vx = 1
                snake.vy = 0
            }

        }
    }
}

export const api: Api = {
    initGame: (grid: HTMLElement, constants: Object, store: Store, gui: any) => {
        if (gui) gui.setup(this.api)
        this.api.constants = constants
        this?.api?.store = store
        this?.api?.store?.grid = grid
        this?.api?.setupGrid(grid)
        this?.api?.store.snake = new Snake(api)
        this?.api?.store.food = new Food(api)
        document.addEventListener(`keydown`, this.api.store.snake.changeDirection)
        // get high score from local storage
        const highScore = localStorage.getItem(`highScore`)
        if (highScore) {
            document.getElementById(`highscore`).innerHTML = `High Score: ${highScore}`
            this.api.store.highScore = highScore
        }
    },
    getBoardState: () => {
        // get the current state of the board indicating what cells are empty, occupied by the snake, occupied by a “food item”
        const grid = document.getElementById('grid')
        const tiles = grid.querySelectorAll('.tile-class')
        const boardState = []
        let board = Array.from(tiles).map((tile: HTMLElement) => {
            const tileState = {
                x: parseInt(tile.dataset.x),
                y: parseInt(tile.dataset.y),
                contents: Array.from(tile.children),
                empty: tile.children.length == 0,
                snake: tile.children.length > 0 && tile.children[0].classList.contains('snake-class'),
                food: tile.children.length > 0 && tile.children[0].classList.contains('food')

            }
            return tileState
        })
        const empty = board.filter((tile: Tile) => tile.empty)
        const snake = board.filter((tile: Tile) => tile.snake)
        const food = board.filter((tile: Tile) => tile.food)
        return {
            board,
            empty,
            snake,
            food
        }
    },
    start () {
        if (this.store.gameOver) { console.log(`it is gameover, so restart`); return this.restart() }
        if (!this.store.pause) return
        this.store.pause = false
        this.mainLoop()
        document.querySelector(`#message`).innerText = `Go!`
    },
    setGameOver () { 
        // set the dead class on the snake body parts
        this.store.snake.body.forEach((bodyPart: Coords) => {
            const selector = `.tile-class[data-x="${bodyPart.x}"][data-y="${bodyPart.y}"]`
            const tile = this.store.grid.querySelector(selector)
            if (tile)
                tile.children[0].classList.add('dead')
        }
        document.querySelector(`#message`).innerHTML = `Game Over`
        this.store.gameOver = true;
        // save high score to local storage if it is greater than the current high score
        const highScore = localStorage.getItem(`highScore`)
        if (highScore) {
            if (this.store.score > parseInt(highScore)) {
                localStorage.setItem(`highScore`, this.store.score.toString())
                document.querySelector(`#message`).innerHTML += `\nNew High Score! You are a boss!`)
            }
        }
        // if no high score save it to local storage
        else {
            localStorage.setItem(`highScore`, this.store.score.toString())
        }
    },
    pause () { this.store.pause = true },
    restart () {
        this.setGameOver.bind(this)
        this.store.score = 3 
        this.store.snake.remove(this)
        this.store.snake = new Snake(this)
        this.store.food.remove(this)
        this.store.food = new Food(this)
        this.store.gameOver = false
        document.querySelector(`#score`).innerHTML = `Score: ${this.store.score}`
        document.querySelector(`#message`).innerHTML = `Good luck!`
        window.api.store.pause = true
        setTimeout(() => {
            window.api.start()
        }, 1500)
    },
    beep(api) {
        const snd = new Audio(api.constants.BEEP);  
        snd.play();
    }
    mainLoop: () => {
        // check if game is over
        this.api.store.snake.changingDirection = false
        if (this.api.store.pause) return
        // if score > 20 then increase speed
        if (this.api.store.score > 20)
            this.api.setDifficulty(`hard`)
        if (this.api.store.score > 50)
            this.api.store.interval = 100
        if (!this.api.store.gameOver) {
            setTimeout(() => {
                this.api.store.snake.move(this.api)
                this.api.mainLoop(this.api)
            }, this.api.store.interval)
        } else {
            document.querySelector(`#message`).innerHTML = `Game Over`
        }
    },
    setupGrid: (grid: HTMLElement) => {
        const gridSize = this.api.store.gridSize || this.api.constants[ this.api.constants.DEFAULT_GRID_SIZE]
        this.api.store.gridSize = gridSize
        const { TILE_SIZE } = this.api.constants
        const tileSize = TILE_SIZE || 100
        this.api.store.tileSize = tileSize
        // style the grid
        grid.style.backgroundColor = this.api.constants.BACKGROUND_COLOR
        grid.style.height = `${gridSize * tileSize}px`
        grid.style.width = `${gridSize * tileSize}px`
        grid.classList.add('grid-class')
        // set up each tile in the grid
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const tile = document.createElement('div')
                tile.classList.add('tile-class')
                tile.style.height = `${tileSize / gridSize}%`
                tile.style.width = `${tileSize / gridSize}%`
                tile.style.top = `${i * tileSize / gridSize}%`
                tile.style.left = `${j * tileSize / gridSize}%`
                // add the x and y coords to the dataset
                tile.dataset.y = `${i}`
                tile.dataset.x = `${j}`
                grid.appendChild(tile)
            }
        }
    },
    setDifficulty (difficulty: Difficulties): void {
        this.store.difficulty = difficulty
        this.store.interval = this.constants[`INTERVALS`][difficulty.toUpperCase()]
    },
    changeDirection(direction: `UP` | `DOWN` | `LEFT` | `RIGHT`) {
        this.store.snake.changeDirection({keyCode: this.constants.KEYS[direction]})
    },

    setBoardSize (boardSize: BoardSizes): void {
        this.store.gridSize = boardSize
        this.store.score = 3
        // remove all tiles from the grid
        const grid = document.getElementById('grid')
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        // set up the grid
        this.initGame.call({api},grid, this.constants, this.store)

    },
    constants: null,
    store: null,
}