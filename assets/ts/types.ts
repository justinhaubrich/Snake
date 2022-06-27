export interface Api {
    initGame: (grid: HTMLElement, constants: Object, store: Object, gui: any) => void;
    beep: (api: Api) => void;
    getHighScore: (api: Api) => number | void;
    getBoardState: () => Object;
    mainLoop: () => void;
    setupGrid: (grid: HTMLElement) => void;
    start: () => void;
    restart: () => void;
    pause: () => void;
    setGameOver: () => void;
    setDifficulty: (difficulty: Difficulties) => void;
    changeDirection: (direction: Directions) => void;
    setBoardSize: (boardSize: BoardSizes) => void;
    constants: any | null;
    store: Store | null;
}

export interface Coords {
    x: number;
    y: number;
}

export interface Store {
    snake: Snake;
    food: { body: Coords, remove: () => void, draw: () => void };
    score: number;
    grid: HTMLElement;
    gridSize: number;
    tileSize: number;
    interval: number;
    highScore?: number;
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

export type Difficulties = 'easy' | 'medium' | 'hard';
export type Directions = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
export type BoardSizes = 7 | 15 | 21;