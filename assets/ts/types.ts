export interface Api {
    initGame: (grid: HTMLElement, constants: Object, store: Object) => void;
    getBoardState: () => Object;
    mainLoop: () => void;
    setupGrid: (grid: HTMLElement) => void;
    start: () => void;
    constants: Object | null;
    store: Store | null;
}

export interface Coords {
    x: number;
    y: number;
}

export interface Store {
    snake: Snake;
    food: { body: Coords, draw: () => void };
    score: number;
    grid: HTMLElement;
    gridSize: number;
    tileSize: number;
    interval: number;
    gameOver: Boolean;
    pause: Boolean;
}

export interface Snake {
    body: Coords[];
    vx: number;
    vy: number;
    changingDirection: Boolean;
    draw: () => void;
    changeDirection: (event: KeyboardEvent) => void;
    move: (api: Api) => void;
    remove: (api: Api) => void;
}