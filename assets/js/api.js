"use strict";
var _this = this;
exports.__esModule = true;
exports.api = void 0;
var Food = /** @class */ (function () {
    function Food(api) {
        this.body = { x: 0, y: 0 };
        // generate a random location for the food
        this.body.x = Math.ceil(Math.random() * api.store.gridSize);
        this.body.y = Math.ceil(Math.random() * api.store.gridSize);
        console.log("Food Instantiated at ".concat(this.body.x, ", ").concat(this.body.y));
        this.draw();
    }
    Food.prototype.draw = function () {
        var _this = this;
        // draw the food
        var food = document.createElement('div');
        food.classList.add('food');
        // append it to the correct tile
        console.log("api.store.grid.children", exports.api.store.grid.children);
        Array.from(exports.api.store.grid.children).forEach(function (tile) {
            console.log("tile loop for food", tile);
            if (parseInt(tile.dataset.x) == _this.body.x && parseInt(tile.dataset.y) == _this.body.y) {
                tile.appendChild(food);
            }
        }); //.appendChild(food)
    };
    return Food;
}());
var Snake = /** @class */ (function () {
    function Snake(grid, constants, api) {
        //velocity for x and y direction of snake movement
        this.vx = 0;
        this.vy = 0;
        this.changingDirection = false;
        // initialize snake body in middle of grid
        var tiles = grid.querySelectorAll(".tile-class");
        var gridSize = Math.sqrt(tiles.length);
        console.log("instantiating snake", grid, gridSize, tiles);
        var middleTile = Math.ceil(gridSize / 2);
        this.body = [{ x: middleTile, y: middleTile - 3 }, { x: middleTile, y: middleTile - 2 }, { x: middleTile, y: middleTile - 1 }];
        this.draw(api);
    }
    Snake.prototype.draw = function (api) {
        console.log("drawing snake");
        this.body.forEach(function (bodyPart) {
            var body = document.createElement('div');
            body.classList.add('snake-class');
            console.log("drawing snake part", bodyPart, body);
            // render the snake body part on the grid in the correct tile if a snake has not yet been rendered
            var selector = ".tile-class[data-x=\"".concat(bodyPart.x, "\"][data-y=\"").concat(bodyPart.y, "\"]");
            console.log("selector", selector, api.store.grid);
            var tile = api.store.grid.querySelector(selector);
            tile.appendChild(body);
            // if a snake has already been rendered, then the body part should be moved to the correct tile (nevermind, just make a separate method for  moving)
        });
    };
    return Snake;
}());
exports.api = {
    initGame: function (grid, constants, store) {
        var _a, _b, _c, _d, _e, _f;
        _this.api.constants = constants;
        console.log("initiating", _this, store);
        (_a = _this === null || _this === void 0 ? void 0 : _this.api) === null || _a === void 0 ? void 0 : _a.store = store;
        (_c = (_b = _this === null || _this === void 0 ? void 0 : _this.api) === null || _b === void 0 ? void 0 : _b.store) === null || _c === void 0 ? void 0 : _c.grid = grid;
        (_d = _this === null || _this === void 0 ? void 0 : _this.api) === null || _d === void 0 ? void 0 : _d.setupGrid(grid);
        (_e = _this === null || _this === void 0 ? void 0 : _this.api) === null || _e === void 0 ? void 0 : _e.store.snake = new Snake(grid, constants, exports.api);
        (_f = _this === null || _this === void 0 ? void 0 : _this.api) === null || _f === void 0 ? void 0 : _f.store.food = new Food(exports.api);
    },
    mainLoop: function () {
        console.log("main loop");
    },
    setupGrid: function (grid) {
        console.log("setting up grid");
        var gridSize = _this.api.constants[_this.api.constants.DEFAULT_GRID_SIZE];
        _this.api.store.gridSize = gridSize;
        var TILE_SIZE = _this.api.constants.TILE_SIZE;
        var tileSize = TILE_SIZE || 100;
        _this.api.store.tileSize = tileSize;
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
                // add the x and y coords to the dataset
                tile.dataset.x = "".concat(i);
                tile.dataset.y = "".concat(j);
                grid.appendChild(tile);
            }
        }
    },
    constants: null,
    store: null
};
