"use strict";
var _this = this;
exports.__esModule = true;
exports.api = void 0;
var Snake = /** @class */ (function () {
    function Snake(grid, constants, api) {
        this.grid = grid;
        this.constants = constants;
        this.api = api;
        this.body = [{}];
    }
    return Snake;
}());
exports.api = {
    initGame: function (grid, constants) {
        var _a;
        var snake = new Snake(grid, constants, exports.api);
        _this.api.constants = constants;
        console.log("initiating", _this);
        (_a = _this === null || _this === void 0 ? void 0 : _this.api) === null || _a === void 0 ? void 0 : _a.setupGrid(grid);
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
        // set up the grid
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
    constants: null
};
