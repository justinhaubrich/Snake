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
                var _tile = tile;
                _tile.appendChild(food);
                _this.tile = _tile;
                _this.element = food;
            }
        }); //.appendChild(food)
    };
    Food.prototype.remove = function () {
        var _a, _b, _c;
        console.log('removing food');
        if ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.tile) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.remove)
            this.tile.children[0].remove();
    };
    return Food;
}());
var Snake = /** @class */ (function () {
    function Snake(api) {
        //velocity for x and y direction of snake movement
        this.vx = 0;
        this.vy = -1;
        this.changingDirection = false;
        // initialize snake body in middle of grid
        var tiles = api.store.grid.querySelectorAll(".tile-class");
        var gridSize = Math.sqrt(tiles.length);
        console.log("instantiating snake", api.store.grid, gridSize, tiles);
        var middleTile = Math.floor(gridSize / 2);
        console.log("middleTile", middleTile);
        this.body = [{ x: middleTile, y: gridSize - 3 }, { x: middleTile, y: gridSize - 2 }, { x: middleTile, y: gridSize - 1 }];
        this.draw(api);
    }
    Snake.prototype.remove = function (api) {
        // remove the snake from the grid
        console.log("remove snake");
        this.body.forEach(function (bodyPart) {
            var selector = ".tile-class[data-x=\"".concat(bodyPart.x, "\"][data-y=\"").concat(bodyPart.y, "\"]");
            var tile = api.store.grid.querySelector(selector);
            console.log("removing bodyPart", bodyPart, tile, selector);
            if (tile)
                Array.from(tile.children).forEach(function (el) { return el.remove(); });
        });
    };
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
        // move the snake, add a head and pop the tail if not eating food
        var head = { x: this.body[0].x + this.vx, y: this.body[0].y + this.vy };
        // add the head to the body
        this.body.unshift(head);
        // add the new head to the tile
        var selector = ".tile-class[data-x=\"".concat(head.x, "\"][data-y=\"").concat(head.y, "\"]");
        var bodyPart = document.createElement('div');
        bodyPart.classList.add('snake-class');
        try {
            api.store.grid.querySelector(selector).appendChild(bodyPart);
        }
        catch (e) {
            // user tried to go out of bounds
            console.log("collision with wall");
            api.setGameOver(api);
            api.mainLoop();
        }
        // check if the snake has eaten food
        if (head.x == api.store.food.body.x && head.y == api.store.food.body.y) {
            api.beep(api);
            api.store.score += 1;
            if (api.store.score > 20)
                document.querySelector("#message").innerHTML = "You're getting good at this!";
            if (api.store.score > 25)
                document.querySelector("#message").innerHTML = "You are a snake boss!";
            if (api.store.score > 30)
                document.querySelector("#message").innerHTML = "You are amazing!";
            if (api.store.score > 35)
                document.querySelector("#message").innerHTML = "Unbelievable!";
            if (api.store.score > 40)
                document.querySelector("#message").innerHTML = "Ridiculous!";
            if (api.store.score > 45)
                document.querySelector("#message").innerHTML = "You are probably cheating!";
            if (api.store.score > 50)
                document.querySelector("#message").innerHTML = "You are definitely cheating!";
            document.getElementById("score").innerHTML = "Score: ".concat(api.store.score);
            // remove old food element from tile generate a new food
            api.store.food.remove();
            api.store.food = new Food(api);
        }
        else {
            // remove the tail from the tile grid
            var tile = api.store.grid.querySelector(".tile-class[data-x=\"".concat(this.body[this.body.length - 1].x, "\"][data-y=\"").concat(this.body[this.body.length - 1].y, "\"]"));
            console.log(tile);
            tile.children[0].remove();
            // pop the tail
            this.body.pop();
        }
        // check if the snake has hit the wall or itself
        this.checkCollision(api);
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
            api.setGameOver(api);
            api.mainLoop();
        }
        // check if the snake has hit itself
        this.body.forEach(function (bodyPart, index) {
            if (index > 0) {
                if (head.x == bodyPart.x && head.y == bodyPart.y) {
                    console.log("collision with self");
                    api.setGameOver(api);
                    api.mainLoop(api);
                }
            }
        });
    };
    Snake.prototype.changeDirection = function (event) {
        if ('preventDefault' in event)
            event.preventDefault();
        var keyPress = event.keyCode;
        console.log(window.api, window.api.store.snake.vy, event);
        var KEYS = window.api.constants.KEYS;
        // determine current direction
        var snake = window.api.store.snake;
        var goingUp = snake.vy == -1;
        var goingDown = snake.vy == 1;
        var goingLeft = snake.vx == -1;
        var goingRight = snake.vx == 1;
        // the snake cannot reverse direction
        // change the velocity of the snake
        // prevent the snake from changing direction twice in a row
        if (!snake.changingDirection) {
            snake.changingDirection = true;
            console.log("keypress is ".concat(keyPress, ", goingUp is ").concat(goingUp, ", goingDown is ").concat(goingDown, ", goingLeft is ").concat(goingLeft, ", goingRight is ").concat(goingRight));
            if (keyPress == KEYS.DOWN && !goingUp) {
                snake.vx = 0;
                snake.vy = 1;
            }
            if (keyPress == KEYS.UP && !goingDown) {
                snake.vx = 0;
                snake.vy = -1;
            }
            if (keyPress == KEYS.LEFT && !goingRight) {
                snake.vx = -1;
                snake.vy = 0;
            }
            if (keyPress == KEYS.RIGHT && !goingLeft) {
                snake.vx = 1;
                snake.vy = 0;
            }
        }
    };
    return Snake;
}());
exports.api = {
    initGame: function (grid, constants, store, gui) {
        var _a, _b, _c, _d, _e, _f;
        if (gui)
            gui.setup(_this.api);
        _this.api.constants = constants;
        console.log("initiating", _this, store);
        (_a = _this === null || _this === void 0 ? void 0 : _this.api) === null || _a === void 0 ? void 0 : _a.store = store;
        (_c = (_b = _this === null || _this === void 0 ? void 0 : _this.api) === null || _b === void 0 ? void 0 : _b.store) === null || _c === void 0 ? void 0 : _c.grid = grid;
        (_d = _this === null || _this === void 0 ? void 0 : _this.api) === null || _d === void 0 ? void 0 : _d.setupGrid(grid);
        console.log(_this.api.store);
        (_e = _this === null || _this === void 0 ? void 0 : _this.api) === null || _e === void 0 ? void 0 : _e.store.snake = new Snake(exports.api);
        (_f = _this === null || _this === void 0 ? void 0 : _this.api) === null || _f === void 0 ? void 0 : _f.store.food = new Food(exports.api);
        console.log(_this.api);
        document.addEventListener("keydown", _this.api.store.snake.changeDirection);
        // get high score from local storage
        var highScore = localStorage.getItem("highScore");
        if (highScore) {
            document.getElementById("highscore").innerHTML = "High Score: ".concat(highScore);
            _this.api.store.highScore = highScore;
        }
    },
    getBoardState: function () {
        // get the current state of the board indicating what cells are empty, occupied by the snake, occupied by a “food item”
        var grid = document.getElementById('grid');
        var tiles = grid.querySelectorAll('.tile-class');
        var boardState = [];
        var board = Array.from(tiles).map(function (tile) {
            var tileState = {
                x: parseInt(tile.dataset.x),
                y: parseInt(tile.dataset.y),
                contents: Array.from(tile.children),
                empty: tile.children.length == 0,
                snake: tile.children.length > 0 && tile.children[0].classList.contains('snake-class'),
                food: tile.children.length > 0 && tile.children[0].classList.contains('food')
            };
            return tileState;
        });
        var empty = board.filter(function (tile) { return tile.empty; });
        var snake = board.filter(function (tile) { return tile.snake; });
        var food = board.filter(function (tile) { return tile.food; });
        return {
            board: board,
            empty: empty,
            snake: snake,
            food: food
        };
    },
    start: function () { if (!this.store.pause)
        return; this.store.pause = false; this.mainLoop(); document.querySelector("#message").innerText = "Go!"; },
    setGameOver: function () {
        var _this = this;
        // set the dead class on the snake body parts
        this.store.snake.body.forEach(function (bodyPart) {
            var selector = ".tile-class[data-x=\"".concat(bodyPart.x, "\"][data-y=\"").concat(bodyPart.y, "\"]");
            var tile = _this.store.grid.querySelector(selector);
            console.log("gameover, tile is", tile, selector);
            if (tile)
                tile.children[0].classList.add('dead');
        }, document.querySelector("#message").innerHTML = "Game Over", console.log("setGameOver called", this), this.store.gameOver = true);
        // save high score to local storage if it is greater than the current high score
        var highScore = localStorage.getItem("highScore");
        if (highScore) {
            if (this.store.score > parseInt(highScore)) {
                localStorage.setItem("highScore", this.store.score.toString());
                document.querySelector("#message").innerHTML += "\nNew High Score! You are a boss!";
            }
        }
        // if no high score save it to local storage
        else {
            localStorage.setItem("highScore", this.store.score.toString());
        }
    },
    pause: function () { this.store.pause = true; },
    restart: function () {
        this.setGameOver.bind(this);
        this.store.score = 3;
        this.store.snake.remove(this);
        this.store.snake = new Snake(this);
        this.store.food.remove(this);
        this.store.food = new Food(this);
        this.store.gameOver = false;
        document.querySelector("#score").innerHTML = "Score: ".concat(this.store.score);
        document.querySelector("#message").innerHTML = "Good luck!";
        window.api.store.pause = true;
        setTimeout(function () {
            window.api.start();
        }, 1500);
    },
    beep: function (api) {
        var snd = new Audio(api.constants.BEEP);
        snd.play();
    },
    mainLoop: function () {
        // check if game is over
        console.log("main loop");
        _this.api.store.snake.changingDirection = false;
        if (_this.api.store.pause)
            return;
        // if score > 20 then increase speed
        if (_this.api.store.score > 20)
            _this.api.setDifficulty("hard");
        if (!_this.api.store.gameOver) {
            setTimeout(function () {
                _this.api.store.snake.move(_this.api);
                _this.api.mainLoop(_this.api);
            }, _this.api.store.interval);
        }
        else {
            document.querySelector("#message").innerHTML = "Game Over";
        }
    },
    setupGrid: function (grid) {
        console.log("setting up grid");
        var gridSize = _this.api.store.gridSize || _this.api.constants[_this.api.constants.DEFAULT_GRID_SIZE];
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
    setDifficulty: function (difficulty) {
        this.store.difficulty = difficulty;
        this.store.interval = this.constants["INTERVALS"][difficulty.toUpperCase()];
    },
    changeDirection: function (direction) {
        this.store.snake.changeDirection({ keyCode: this.constants.KEYS[direction] });
    },
    setBoardSize: function (boardSize) {
        this.store.gridSize = boardSize;
        this.store.score = 3;
        // remove all tiles from the grid
        var grid = document.getElementById('grid');
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        // set up the grid
        this.initGame.call({ api: exports.api }, grid, this.constants, this.store);
    },
    constants: null,
    store: null
};
