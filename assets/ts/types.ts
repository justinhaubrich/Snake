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

interface Store {
    snake: any;
    score: number;
}