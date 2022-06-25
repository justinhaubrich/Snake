export interface Api {
    initGame: (grid: HTMLElement, constants: Object, store: Object) => void;
    mainLoop: () => void;
    setupGrid: (grid: HTMLElement) => void;
    constants: Object | null;
    store: Object | null;
}

export interface Coords {
    x: number;
    y: number;
}

export interface Store {
    snake: any;
    food: { body: Coords, draw: () => void };
    score: number;
    grid: HTMLElement;
    gridSize: number;
    tileSize: number;
    interval: number;
    gameOver: Boolean;
}
