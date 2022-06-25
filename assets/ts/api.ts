import { Api } from './types';
import { Coords, Store } from './types';

class Snake {
    public body: Array<Coords>;
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
    }
}

export const api: Api = {
    initGame: (grid: HTMLElement, constants: Object, store: Store) => {
        this.api.constants = constants
        console.log(`initiating`, this, store)
        this?.api?.setupGrid(grid)
        this?.api?.store = store
        this?.api?.store.snake = new Snake(grid, constants, api)
    },
    mainLoop: () => {
        console.log(`main loop`)
    },
    setupGrid: (grid: HTMLElement) => {
        console.log(`setting up grid`)
        const gridSize = this.api.constants[this.api.constants.DEFAULT_GRID_SIZE]
        const { TILE_SIZE } = this.api.constants
        const tileSize = TILE_SIZE || 100
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
                grid.appendChild(tile)
            }
        }
    },
    constants: null,
    store: null,
}