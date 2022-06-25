import { Api } from './types';
import { Coords, Store } from './types';

class Food {
    constructor(api) { 
        // generate a random location for the food
        this.body.x = Math.floor(Math.random() * api.store.gridSize)
        this.body.y = Math.floor(Math.random() * api.store.gridSize)
        console.log(`Food Instantiated at ${this.body.x}, ${this.body.y}`)
        this.draw()
    }
    public body: Coords = { x: 0, y: 0 };
    public draw () {
        // draw the food
        const food = document.createElement('div')
        food.classList.add('food')
        // append it to the correct tile
        Array.from(api.store.grid.children).forEach( tile => {
            if (parseInt(tile.dataset.x) == this.body.x && parseInt(tile.dataset.y) == this.body.y) {
                tile.appendChild(food)
            }
        }) //.appendChild(food)
    }
}

class Snake {
    public body: Array<Coords>;
    //velocity for x and y direction of snake movement
    public vx: number = 0;
    public vy: number = 0;
    public changingDirection: Boolean = false
    constructor(
        grid: HTMLElement,
        constants: Object,
        api: Api
    ) {
        // initialize snake body in middle of grid
        const tiles: NodeListOf<Element> = grid.querySelectorAll(`.tile-class`)
        const gridSize: number = Math.sqrt(tiles.length)
        console.log(`instantiating snake`, grid, gridSize, tiles)
        const middleTile: number = Math.ceil(gridSize / 2)
        this.body = [{ x: middleTile, y: middleTile -3 }, { x: middleTile, y: middleTile - 2 }, { x: middleTile, y: middleTile - 1 }]
        this.draw(api)
    }

    public draw(api: Api) {
        console.log(`drawing snake`)
        this.body.forEach((bodyPart: Coords) => {
            const body: HTMLElement = document.createElement('div')
            body.classList.add('snake-class')
            console.log(`drawing snake part`, bodyPart, body)
            // render the snake body part on the grid in the correct tile if a snake has not yet been rendered
            const selector: string = `.tile-class[data-x="${bodyPart.x}"][data-y="${bodyPart.y}"]`
            console.log(`selector`, selector, api.store.grid)
            const tile: HTMLElement = api.store.grid.querySelector(selector)
            tile.appendChild(body)
            // if a snake has already been rendered, then the body part should be moved to the correct tile (nevermind, just make a separate method for  moving)

        })
    }
}

export const api: Api = {
    initGame: (grid: HTMLElement, constants: Object, store: Store) => {
        this.api.constants = constants
        console.log(`initiating`, this, store)
        this?.api?.store = store
        this?.api?.store?.grid = grid
        this?.api?.setupGrid(grid)
        this?.api?.store.snake = new Snake(grid, constants, api)
        this?.api?.store.food = new Food(api)
    },
    mainLoop: () => {
        console.log(`main loop`)
    },
    setupGrid: (grid: HTMLElement) => {
        console.log(`setting up grid`)
        const gridSize = this.api.constants[this.api.constants.DEFAULT_GRID_SIZE]
        this.api.store.gridSize = gridSize
        const { TILE_SIZE } = this.api.constants
        const tileSize = TILE_SIZE || 100
        this.api.store.tileSize = tileSize
        console.log(`gridSize: `, gridSize, TILE_SIZE)
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
                tile.dataset.x = `${i}`
                tile.dataset.y = `${j}`
                grid.appendChild(tile)
            }
        }
    },
    constants: null,
    store: null,
}