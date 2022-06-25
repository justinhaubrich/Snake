"use strict";
var _this = this;
exports.__esModule = true;
exports.api = void 0;
var Snake = /** @class */ (function () {
    function Snake(grid, constants, api) {
        // initialize snake body in middle of grid
        var tiles = grid.querySelectorAll(".tile-class");
        var gridSize = Math.sqrt(tiles.length);
        console.log("instantiating snake", grid, gridSize, tiles);
        var middleTile = Math.ceil(gridSize / 2);
        this.body = [{ x: middleTile, y: middleTile - 3 }, { x: middleTile, y: middleTile - 2 }, { x: middleTile, y: middleTile - 1 }];
    }
    return Snake;
}());
exports.api = {
    initGame: function (grid, constants, store) {
        var _a, _b, _c;
        _this.api.constants = constants;
        console.log("initiating", _this, store);
        (_a = _this === null || _this === void 0 ? void 0 : _this.api) === null || _a === void 0 ? void 0 : _a.setupGrid(grid);
        (_b = _this === null || _this === void 0 ? void 0 : _this.api) === null || _b === void 0 ? void 0 : _b.store = store;
        (_c = _this === null || _this === void 0 ? void 0 : _this.api) === null || _c === void 0 ? void 0 : _c.store.snake = new Snake(grid, constants, exports.api);
    },
    mainLoop: function () {
        console.log("main loop");
    },
    setupGrid: function (grid) {
        console.log("setting up grid");
        var gridSize = _this.api.constants[_this.api.constants.DEFAULT_GRID_SIZE];
        var TILE_SIZE = _this.api.constants.TILE_SIZE;
        var tileSize = TILE_SIZE || 100;
        console.log("gridSize: ", gridSize, TILE_SIZE);
        // style the grid
        grid.style.backgroundColor = _this.api.constants.BACKGROUND_COLOR;
        grid.style.height = "".concat(gridSize * tileSize, "px");
        grid.style.width = "".concat(gridSize * tileSize, "px");
        grid.classList.add('grid-class');
        // set up each tile in the grid
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                var tile = document.createElement('div');
                tile.classList.add('tile-class');
                tile.style.height = "".concat(tileSize / gridSize, "%");
                tile.style.width = "".concat(tileSize / gridSize, "%");
                tile.style.top = "".concat(i * tileSize / gridSize, "%");
                tile.style.left = "".concat(j * tileSize / gridSize, "%");
                grid.appendChild(tile);
            }
        }
    },
    constants: null,
    store: null
};
