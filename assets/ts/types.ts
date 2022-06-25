export interface Api {
    initGame: (grid: HTMLElement, constants: Object) => void;
    mainLoop: () => void;
    setupGrid: (grid: HTMLElement) => void;
    constants: Object | null;
}

export interface Coords {
    x: number;
    y: number;
}