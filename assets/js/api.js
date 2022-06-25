"use strict";
var _this = this;
exports.__esModule = true;
exports.api = void 0;
var Food = /** @class */ (function () {
    function Food(api) {
        this.body = { x: 0, y: 0 };
        // generate a random location for the food
        this.body.x = Math.floor(Math.random() * api.store.gridSize);
        this.body.y = Math.floor(Math.random() * api.store.gridSize);
        console.log("Food Instantiated at ".concat(this.body.x, ", ").concat(this.body.y));
        this.draw();
    }
    Food.prototype.draw = function () {
        var _this = this;
        // draw the food
        var food = document.createElement('div');
        food.classList.add('food');
        // append it to the correct tile
        Array.from(exports.api.store.grid.children).forEach(function (tile) {
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
        this.vy = -1;
        this.changingDirection = false;
        // initialize snake body in middle of grid
        var tiles = grid.querySelectorAll(".tile-class");
        var gridSize = Math.sqrt(tiles.length);
        console.log("instantiating snake", grid, gridSize, tiles);
        var middleTile = Math.floor(gridSize / 2);
        console.log("middleTile", middleTile);
        this.body = [{ x: middleTile, y: gridSize - 3 }, { x: middleTile, y: gridSize - 2 }, { x: middleTile, y: gridSize - 1 }];
        this.draw(api);
    }
    Snake.prototype.draw = function (api) {
        console.log("drawing snake");
        this.body.forEach(function (bodyPart) {
            var body = document.createElement('div');
            body.classList.add('snake-class');
            console.log("drawing snake part", bodyPart, body);
            // render the snake body part on the grid in the correct tile
            var selector = ".tile-class[data-x=\"".concat(bodyPart.x, "\"][data-y=\"").concat(bodyPart.y, "\"]");
            console.log("selector", selector, api.store.grid);
            var tile = api.store.grid.querySelector(selector);
            tile.appendChild(body);
        });
    };
    Snake.prototype.move = function (api) {
        // move the snake by adding the velocity to the body parts x and y coordinates
        // this.body.forEach((bodyPart: Coords, index: number) => {
        // console.log(`moving snake`, bodyPart, index)
        //     if (index == 0) {
        //         bodyPart.x += this.vx
        //         bodyPart.y += this.vy
        //     } else {
        //         bodyPart.x = this.body[index - 1].x
        //         bodyPart.y = this.body[index - 1].y
        //     }
        // })
        // move the snake, add a head and pop the tail if not eating food
        var head = { x: this.body[0].x + this.vx, y: this.body[0].y + this.vy };
        // add the head to the body
        this.body.unshift(head);
        // add the new head to the tile
        var selector = ".tile-class[data-x=\"".concat(head.x, "\"][data-y=\"").concat(head.y, "\"]");
        api.store.grid.querySelector(selector).appendChild(document.createElement('div.snake-class'));
        // check if the snake has eaten food
        if (head.x == api.store.food.body.x && head.y == api.store.food.body.y) {
            api.store.score += 1;
            document.getElementById("score").innerHTML = "Score: ".concat(api.store.score);
            // generate a new food
        }
        else {
            // remove the tail from the tile grid
            var tile = api.store.grid.querySelector(".tile-class[data-x=\"".concat(this.body[this.body.length - 1].x, "\"][data-y=\"").concat(this.body[this.body.length - 1].y, "\"]"));
            console.log(tile);
            tile.empty();
            // pop the tail
            this.body.pop();
        }
        // check if the snake has hit the wall or itself
        this.checkCollision(api);
        // delete the old body part and draw the new one
        Array.from(document.querySelectorAll(".snake-class")).forEach(function (bodyPart) { return bodyPart.remove(); });
    };
    Snake.prototype.checkCollision = function (api) {
        console.log("checking collision");
        // check if the snake has hit the wall or itself
        var head = this.body[0];
        console.log("api is", api, head);
        var tiles = api.store.grid.querySelectorAll(".tile-class");
        var gridSize = Math.sqrt(tiles.length);
        // check if the snake has hit the wall
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            console.log("collision with wall");
            api.mainLoop();
        }
        // check if the snake has hit itself
        this.body.forEach(function (bodyPart, index) {
            if (index > 0) {
                if (head.x == bodyPart.x && head.y == bodyPart.y) {
                    console.log("collision with self");
                    api.mainLoop();
                }
            }
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
                tile.dataset.y = "".concat(i);
                tile.dataset.x = "".concat(j);
                grid.appendChild(tile);
            }
        }
    },
    constants: null,
    store: null
};
