import { Api } from './types';
import { Coords } from './types';

class Snake {
    public body: Array<Coords>;
    constructor(
        public grid: HTMLElement,
        public constants: Object,
        public api: Api
    ) {
        this.body = [{ }]
    }
}

export const api: Api = {
    initGame: (grid: HTMLElement, constants: Object) => {
        const snake = new Snake(grid, constants, api)
        this.api.constants = constants
        console.log(`initiating`, this)
        this?.api?.setupGrid(grid)
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
        // set up the grid
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
}