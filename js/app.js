/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/api.js":
/*!**************************!*\
  !*** ./assets/js/api.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__ */
/*! CommonJS bailout: this is used directly at 2:12-16 */
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar _this = this;\nexports.__esModule = true;\nexports.api = void 0;\nvar Food = /** @class */ (function () {\n    function Food(api) {\n        this.body = { x: 0, y: 0 };\n        // generate a random location for the food\n        this.body.x = Math.floor(Math.random() * api.store.gridSize);\n        this.body.y = Math.floor(Math.random() * api.store.gridSize);\n        this.draw();\n    }\n    Food.prototype.draw = function () {\n        var _this = this;\n        // draw the food\n        var food = document.createElement('div');\n        food.classList.add('food');\n        // append it to the correct tile\n        Array.from(exports.api.store.grid.children).forEach(function (tile) {\n            if (parseInt(tile.dataset.x) == _this.body.x && parseInt(tile.dataset.y) == _this.body.y) {\n                var _tile = tile;\n                _tile.appendChild(food);\n                _this.tile = _tile;\n                _this.element = food;\n            }\n        }); //.appendChild(food)\n    };\n    Food.prototype.remove = function () {\n        var _a, _b, _c;\n        if ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.tile) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.remove)\n            this.tile.children[0].remove();\n    };\n    return Food;\n}());\nvar Snake = /** @class */ (function () {\n    function Snake(api) {\n        //velocity for x and y direction of snake movement\n        this.vx = 0;\n        this.vy = -1;\n        this.changingDirection = false;\n        // initialize snake body in middle of grid\n        var tiles = api.store.grid.querySelectorAll(\".tile-class\");\n        var gridSize = Math.sqrt(tiles.length);\n        var middleTile = Math.floor(gridSize / 2);\n        this.body = [{ x: middleTile, y: gridSize - 3 }, { x: middleTile, y: gridSize - 2 }, { x: middleTile, y: gridSize - 1 }];\n        this.draw(api);\n    }\n    Snake.prototype.remove = function (api) {\n        // remove the snake from the grid\n        this.body.forEach(function (bodyPart) {\n            var selector = \".tile-class[data-x=\\\"\".concat(bodyPart.x, \"\\\"][data-y=\\\"\").concat(bodyPart.y, \"\\\"]\");\n            var tile = api.store.grid.querySelector(selector);\n            if (tile)\n                Array.from(tile.children).forEach(function (el) { return el.remove(); });\n        });\n    };\n    Snake.prototype.draw = function (api) {\n        this.body.forEach(function (bodyPart) {\n            var body = document.createElement('div');\n            body.classList.add('snake-class');\n            // render the snake body part on the grid in the correct tile\n            var selector = \".tile-class[data-x=\\\"\".concat(bodyPart.x, \"\\\"][data-y=\\\"\").concat(bodyPart.y, \"\\\"]\");\n            var tile = api.store.grid.querySelector(selector);\n            tile.appendChild(body);\n        });\n    };\n    Snake.prototype.move = function (api) {\n        // move the snake by adding the velocity to the body parts x and y coordinates\n        // move the snake, add a head and pop the tail if not eating food\n        var head = { x: this.body[0].x + this.vx, y: this.body[0].y + this.vy };\n        // add the head to the body\n        this.body.unshift(head);\n        // add the new head to the tile\n        var selector = \".tile-class[data-x=\\\"\".concat(head.x, \"\\\"][data-y=\\\"\").concat(head.y, \"\\\"]\");\n        var bodyPart = document.createElement('div');\n        bodyPart.classList.add('snake-class');\n        try {\n            api.store.grid.querySelector(selector).appendChild(bodyPart);\n        }\n        catch (e) {\n            // user tried to go out of bounds\n            api.setGameOver(api);\n            api.mainLoop();\n        }\n        // check if the snake has eaten food\n        if (head.x == api.store.food.body.x && head.y == api.store.food.body.y) {\n            api.beep(api);\n            api.store.score += 1;\n            if (api.store.score > 20)\n                document.querySelector(\"#message\").innerHTML = \"You're getting good at this!\";\n            if (api.store.score > 25)\n                document.querySelector(\"#message\").innerHTML = \"You are a snake boss!\";\n            if (api.store.score > 30)\n                document.querySelector(\"#message\").innerHTML = \"You are amazing!\";\n            if (api.store.score > 35)\n                document.querySelector(\"#message\").innerHTML = \"Unbelievable!\";\n            if (api.store.score > 40)\n                document.querySelector(\"#message\").innerHTML = \"Ridiculous!\";\n            if (api.store.score > 45)\n                document.querySelector(\"#message\").innerHTML = \"You are probably cheating!\";\n            if (api.store.score > 50)\n                document.querySelector(\"#message\").innerHTML = \"You are definitely cheating!\";\n            document.getElementById(\"score\").innerHTML = \"Score: \".concat(api.store.score);\n            // remove old food element from tile generate a new food\n            api.store.food.remove();\n            api.store.food = new Food(api);\n        }\n        else {\n            // remove the tail from the tile grid\n            var tile = api.store.grid.querySelector(\".tile-class[data-x=\\\"\".concat(this.body[this.body.length - 1].x, \"\\\"][data-y=\\\"\").concat(this.body[this.body.length - 1].y, \"\\\"]\"));\n            tile.children[0].remove();\n            // pop the tail\n            this.body.pop();\n        }\n        // check if the snake has hit the wall or itself\n        this.checkCollision(api);\n    };\n    Snake.prototype.checkCollision = function (api) {\n        // check if the snake has hit the wall or itself\n        var head = this.body[0];\n        var tiles = api.store.grid.querySelectorAll(\".tile-class\");\n        var gridSize = Math.sqrt(tiles.length);\n        // check if the snake has hit the wall\n        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {\n            api.setGameOver(api);\n            api.mainLoop();\n        }\n        // check if the snake has hit itself\n        this.body.forEach(function (bodyPart, index) {\n            if (index > 0) {\n                if (head.x == bodyPart.x && head.y == bodyPart.y) {\n                    api.setGameOver(api);\n                    api.mainLoop(api);\n                }\n            }\n        });\n    };\n    Snake.prototype.changeDirection = function (event) {\n        if ('preventDefault' in event)\n            event.preventDefault();\n        var keyPress = event.keyCode;\n        var KEYS = window.api.constants.KEYS;\n        // determine current direction\n        var snake = window.api.store.snake;\n        var goingUp = snake.vy == -1;\n        var goingDown = snake.vy == 1;\n        var goingLeft = snake.vx == -1;\n        var goingRight = snake.vx == 1;\n        // the snake cannot reverse direction\n        // change the velocity of the snake\n        // prevent the snake from changing direction twice in a row\n        if (!snake.changingDirection) {\n            snake.changingDirection = true;\n            if (keyPress == KEYS.DOWN && !goingUp) {\n                snake.vx = 0;\n                snake.vy = 1;\n            }\n            if (keyPress == KEYS.UP && !goingDown) {\n                snake.vx = 0;\n                snake.vy = -1;\n            }\n            if (keyPress == KEYS.LEFT && !goingRight) {\n                snake.vx = -1;\n                snake.vy = 0;\n            }\n            if (keyPress == KEYS.RIGHT && !goingLeft) {\n                snake.vx = 1;\n                snake.vy = 0;\n            }\n        }\n    };\n    return Snake;\n}());\nexports.api = {\n    initGame: function (grid, constants, store, gui) {\n        var _a, _b, _c, _d, _e, _f;\n        if (gui)\n            gui.setup(_this.api);\n        _this.api.constants = constants;\n        (_a = _this === null || _this === void 0 ? void 0 : _this.api) === null || _a === void 0 ? void 0 : _a.store = store;\n        (_c = (_b = _this === null || _this === void 0 ? void 0 : _this.api) === null || _b === void 0 ? void 0 : _b.store) === null || _c === void 0 ? void 0 : _c.grid = grid;\n        (_d = _this === null || _this === void 0 ? void 0 : _this.api) === null || _d === void 0 ? void 0 : _d.setupGrid(grid);\n        (_e = _this === null || _this === void 0 ? void 0 : _this.api) === null || _e === void 0 ? void 0 : _e.store.snake = new Snake(exports.api);\n        (_f = _this === null || _this === void 0 ? void 0 : _this.api) === null || _f === void 0 ? void 0 : _f.store.food = new Food(exports.api);\n        document.addEventListener(\"keydown\", _this.api.store.snake.changeDirection);\n        // get high score from local storage\n        var highScore = localStorage.getItem(\"highScore\");\n        if (highScore) {\n            document.getElementById(\"highscore\").innerHTML = \"High Score: \".concat(highScore);\n            _this.api.store.highScore = highScore;\n        }\n    },\n    getBoardState: function () {\n        // get the current state of the board indicating what cells are empty, occupied by the snake, occupied by a “food item”\n        var grid = document.getElementById('grid');\n        var tiles = grid.querySelectorAll('.tile-class');\n        var boardState = [];\n        var board = Array.from(tiles).map(function (tile) {\n            var tileState = {\n                x: parseInt(tile.dataset.x),\n                y: parseInt(tile.dataset.y),\n                contents: Array.from(tile.children),\n                empty: tile.children.length == 0,\n                snake: tile.children.length > 0 && tile.children[0].classList.contains('snake-class'),\n                food: tile.children.length > 0 && tile.children[0].classList.contains('food')\n            };\n            return tileState;\n        });\n        var empty = board.filter(function (tile) { return tile.empty; });\n        var snake = board.filter(function (tile) { return tile.snake; });\n        var food = board.filter(function (tile) { return tile.food; });\n        return {\n            board: board,\n            empty: empty,\n            snake: snake,\n            food: food\n        };\n    },\n    start: function () { if (!this.store.pause)\n        return; this.store.pause = false; this.mainLoop(); document.querySelector(\"#message\").innerText = \"Go!\"; },\n    setGameOver: function () {\n        var _this = this;\n        // set the dead class on the snake body parts\n        this.store.snake.body.forEach(function (bodyPart) {\n            var selector = \".tile-class[data-x=\\\"\".concat(bodyPart.x, \"\\\"][data-y=\\\"\").concat(bodyPart.y, \"\\\"]\");\n            var tile = _this.store.grid.querySelector(selector);\n            if (tile)\n                tile.children[0].classList.add('dead');\n        }, document.querySelector(\"#message\").innerHTML = \"Game Over\", this.store.gameOver = true);\n        // save high score to local storage if it is greater than the current high score\n        var highScore = localStorage.getItem(\"highScore\");\n        if (highScore) {\n            if (this.store.score > parseInt(highScore)) {\n                localStorage.setItem(\"highScore\", this.store.score.toString());\n                document.querySelector(\"#message\").innerHTML += \"\\nNew High Score! You are a boss!\";\n            }\n        }\n        // if no high score save it to local storage\n        else {\n            localStorage.setItem(\"highScore\", this.store.score.toString());\n        }\n    },\n    pause: function () { this.store.pause = true; },\n    restart: function () {\n        this.setGameOver.bind(this);\n        this.store.score = 3;\n        this.store.snake.remove(this);\n        this.store.snake = new Snake(this);\n        this.store.food.remove(this);\n        this.store.food = new Food(this);\n        this.store.gameOver = false;\n        document.querySelector(\"#score\").innerHTML = \"Score: \".concat(this.store.score);\n        document.querySelector(\"#message\").innerHTML = \"Good luck!\";\n        window.api.store.pause = true;\n        setTimeout(function () {\n            window.api.start();\n        }, 1500);\n    },\n    beep: function (api) {\n        var snd = new Audio(api.constants.BEEP);\n        snd.play();\n    },\n    mainLoop: function () {\n        // check if game is over\n        _this.api.store.snake.changingDirection = false;\n        if (_this.api.store.pause)\n            return;\n        // if score > 20 then increase speed\n        if (_this.api.store.score > 20)\n            _this.api.setDifficulty(\"hard\");\n        if (_this.api.store.score > 50)\n            _this.api.store.interval = 100;\n        if (!_this.api.store.gameOver) {\n            setTimeout(function () {\n                _this.api.store.snake.move(_this.api);\n                _this.api.mainLoop(_this.api);\n            }, _this.api.store.interval);\n        }\n        else {\n            document.querySelector(\"#message\").innerHTML = \"Game Over\";\n        }\n    },\n    setupGrid: function (grid) {\n        var gridSize = _this.api.store.gridSize || _this.api.constants[_this.api.constants.DEFAULT_GRID_SIZE];\n        _this.api.store.gridSize = gridSize;\n        var TILE_SIZE = _this.api.constants.TILE_SIZE;\n        var tileSize = TILE_SIZE || 100;\n        _this.api.store.tileSize = tileSize;\n        // style the grid\n        grid.style.backgroundColor = _this.api.constants.BACKGROUND_COLOR;\n        grid.style.height = \"\".concat(gridSize * tileSize, \"px\");\n        grid.style.width = \"\".concat(gridSize * tileSize, \"px\");\n        grid.classList.add('grid-class');\n        // set up each tile in the grid\n        for (var i = 0; i < gridSize; i++) {\n            for (var j = 0; j < gridSize; j++) {\n                var tile = document.createElement('div');\n                tile.classList.add('tile-class');\n                tile.style.height = \"\".concat(tileSize / gridSize, \"%\");\n                tile.style.width = \"\".concat(tileSize / gridSize, \"%\");\n                tile.style.top = \"\".concat(i * tileSize / gridSize, \"%\");\n                tile.style.left = \"\".concat(j * tileSize / gridSize, \"%\");\n                // add the x and y coords to the dataset\n                tile.dataset.y = \"\".concat(i);\n                tile.dataset.x = \"\".concat(j);\n                grid.appendChild(tile);\n            }\n        }\n    },\n    setDifficulty: function (difficulty) {\n        this.store.difficulty = difficulty;\n        this.store.interval = this.constants[\"INTERVALS\"][difficulty.toUpperCase()];\n    },\n    changeDirection: function (direction) {\n        this.store.snake.changeDirection({ keyCode: this.constants.KEYS[direction] });\n    },\n    setBoardSize: function (boardSize) {\n        this.store.gridSize = boardSize;\n        this.store.score = 3;\n        // remove all tiles from the grid\n        var grid = document.getElementById('grid');\n        while (grid.firstChild) {\n            grid.removeChild(grid.firstChild);\n        }\n        // set up the grid\n        this.initGame.call({ api: exports.api }, grid, this.constants, this.store);\n    },\n    constants: null,\n    store: null\n};\n\n\n//# sourceURL=webpack://snake/./assets/js/api.js?");

/***/ }),

/***/ "./assets/js/constants.js":
/*!********************************!*\
  !*** ./assets/js/constants.js ***!
  \********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export constants [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports.constants = void 0;\nexports.constants = {\n    BACKGROUND_COLOR: '#f5f5f5',\n    FONT_COLOR: '#000',\n    FONT_FAMILY: 'sans-serif',\n    FONT_SIZE: '16px',\n    SM_GRID_SIZE: 7,\n    MD_GRID_SIZE: 15,\n    LG_GRID_SIZE: 21,\n    TILE_SIZE: 100,\n    DEFAULT_GRID_SIZE: \"SM_GRID_SIZE\",\n    SNAKE_COLOR: '#2D2',\n    KEYS: {\n        LEFT: 37,\n        RIGHT: 39,\n        UP: 38,\n        DOWN: 40\n    },\n    INTERVALS: {\n        EASY: 500,\n        MEDIUM: 400,\n        HARD: 300\n    },\n    BOARD_SIZES: {\n        SM: 7,\n        MD: 15,\n        LG: 21\n    },\n    BEEP: \"data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=\"\n};\n\n\n//# sourceURL=webpack://snake/./assets/js/constants.js?");

/***/ }),

/***/ "./assets/js/gui.js":
/*!**************************!*\
  !*** ./assets/js/gui.js ***!
  \**************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export gui [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports.gui = void 0;\nexports.gui = {\n    createButton: function (text, className, onClick) {\n        var button = document.createElement('button');\n        button.innerText = text;\n        button.className = className;\n        button.onclick = onClick;\n        return button;\n    },\n    setup: function (api) {\n        // TODO: refactor for DRY\n        var gui = document.querySelector('#gui');\n        var dir_grid = document.createElement('div');\n        dir_grid.classList.add(\"button-grid\");\n        dir_grid.classList.add(\"direction\");\n        gui.append(dir_grid);\n        var button_grid = document.createElement('div');\n        button_grid.classList.add(\"button-grid\");\n        gui.append(button_grid);\n        var start = document.createElement('button');\n        start.classList.add(\"big\");\n        start.classList.add(\"button\");\n        start.innerText = \"Start\";\n        start.onclick = function () { api.start(); };\n        button_grid.append(start);\n        var restart = document.createElement('button');\n        restart.classList.add(\"big\");\n        restart.classList.add(\"button\");\n        restart.innerText = \"Restart\";\n        restart.onclick = function () { api.restart(); };\n        button_grid.append(restart);\n        var pause = document.createElement('button');\n        pause.classList.add(\"big\");\n        pause.classList.add(\"button\");\n        pause.innerText = \"Pause\";\n        pause.onclick = function () { api.pause(); };\n        button_grid.append(pause);\n        var large = document.createElement('button');\n        large.classList.add(\"big\");\n        large.classList.add(\"button\");\n        large.innerText = \"Tiny\";\n        large.onclick = function () { api.setBoardSize(21); };\n        button_grid.append(large);\n        var medium = document.createElement('button');\n        medium.classList.add(\"big\");\n        medium.classList.add(\"button\");\n        medium.innerText = \"Small\";\n        medium.onclick = function () { api.setBoardSize(15); };\n        button_grid.append(medium);\n        var small = document.createElement('button');\n        small.classList.add(\"big\");\n        small.classList.add(\"button\");\n        small.innerText = \"Huge\";\n        small.onclick = function () { api.setBoardSize(7); };\n        button_grid.append(small);\n        button_grid.append(this.createButton(\"Easy\", \"big button\", function () { api.setDifficulty('easy'); }));\n        button_grid.append(this.createButton(\"Medium\", \"big button\", function () { api.setDifficulty('medium'); }));\n        button_grid.append(this.createButton(\"Hard\", \"big button\", function () { api.setDifficulty('hard'); }));\n        dir_grid.append(this.createButton(\"left\", \"big button\", function () { api.changeDirection('LEFT'); }));\n        dir_grid.append(this.createButton(\"right\", \"big button\", function () { api.changeDirection('RIGHT'); }));\n        dir_grid.append(this.createButton(\"up\", \"big button\", function () { api.changeDirection('UP'); }));\n        dir_grid.append(this.createButton(\"down\", \"big button\", function () { api.changeDirection('DOWN'); }));\n        var credit = document.createElement('a');\n        credit.href = \"https://jhaubrich.com\";\n        credit.innerText = \"Snake by Justin Haubrich, 2022\";\n        credit.target = \"_blank\";\n        credit.classList.add(\"credit\");\n        gui.append(credit);\n    }\n};\n\n\n//# sourceURL=webpack://snake/./assets/js/gui.js?");

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nexports.__esModule = true;\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./assets/js/constants.js\");\nvar api_1 = __webpack_require__(/*! ./api */ \"./assets/js/api.js\");\nvar gui_1 = __webpack_require__(/*! ./gui */ \"./assets/js/gui.js\");\nvar store_1 = __webpack_require__(/*! ./store */ \"./assets/js/store.js\");\n__webpack_require__(/*! ../styles/main.css */ \"./assets/styles/main.css\");\nObject.defineProperty(window, 'api', { value: api_1.api, writable: true });\nvar grid = document.getElementById('grid');\nlogInfo();\napi_1.api.initGame(grid, constants_1.constants, store_1.store, gui_1.gui);\nfunction logInfo() {\n    var blackBackground = [\n        \"font-size: 50px\",\n        \"background-color: black\",\n        \"color: white\",\n    ].join(\" ;\");\n    var whiteBackground = [\n        \"font-size: 20px\",\n        \"background-color: white\",\n        \"color: black\",\n    ].join(\" ;\");\n    console.log(\"%cWelcome to Snake %cTo access, the api, just type `api` in the console. Try `api.start()` to start the game.\", blackBackground, whiteBackground);\n}\n\n\n//# sourceURL=webpack://snake/./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/store.js":
/*!****************************!*\
  !*** ./assets/js/store.js ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export store [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports.store = void 0;\nexports.store = {\n    score: 3,\n    interval: 500,\n    pause: true\n};\n\n\n//# sourceURL=webpack://snake/./assets/js/store.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/styles/main.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/styles/main.css ***!
  \**********************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"body::-webkit-scrollbar-thumb {\\n  background-color: rgb(172, 152, 164);\\n  border-radius: 20px;\\n  border: 6px solid transparent;\\n  background-clip: content-box;\\n}\\n\\nbody::-webkit-scrollbar {\\n  width: 1em;\\n}\\n\\nbody::-webkit-scrollbar-track {\\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\\n}\\n\\nbody {\\n  margin: 0px;\\n  background-color: rgb(39, 20, 31);\\n  color: #efefef;\\n  -webkit-user-select: none;\\n  -moz-user-select: none;\\n  -ms-user-select: none;\\n  user-select: none;\\n}\\nbody #gameover {\\n  color: white;\\n}\\nbody #grid_wrapper {\\n  position: relative;\\n  width: 71vh;\\n  height: 71vh;\\n  margin: 0 auto;\\n}\\n@media (max-width: 500px) {\\n  body #grid_wrapper {\\n    width: 100vw;\\n    height: 100vw;\\n  }\\n}\\nbody #grid_wrapper #message, body #grid_wrapper #score, body #grid_wrapper #highscore {\\n  color: rgb(39, 20, 31);\\n  font-family: \\\"Roboto\\\", sans-serif;\\n  text-transform: uppercase;\\n  position: absolute;\\n  left: 15px;\\n  background-color: rgba(255, 255, 255, 0.2666666667);\\n  border-radius: 3px;\\n  padding: 2px 5px;\\n}\\n@media (max-width: 500px) {\\n  body #grid_wrapper #message, body #grid_wrapper #score, body #grid_wrapper #highscore {\\n    font-size: 9pt;\\n    left: 25px;\\n  }\\n}\\nbody #grid_wrapper #message {\\n  top: 3px;\\n}\\nbody #grid_wrapper #score {\\n  top: 23px;\\n}\\nbody #grid_wrapper #highscore {\\n  top: 43px;\\n}\\nbody #grid.grid-class {\\n  display: flex;\\n  flex-wrap: wrap;\\n  margin: 0 auto;\\n  border-radius: 3px;\\n  outline: 5px solid rgb(172, 152, 164);\\n  outline-offset: 4px;\\n  margin-top: 50px;\\n  width: 70vh !important;\\n  height: 70vh !important;\\n}\\n@media (max-width: 500px) {\\n  body #grid.grid-class {\\n    width: 90vw !important;\\n    height: 90vw !important;\\n  }\\n}\\nbody .snake-class {\\n  transition: background-color 250ms ease-in-out;\\n  background-color: #28c641;\\n  width: 90%;\\n  height: 90%;\\n}\\nbody .snake-class.dead {\\n  background-color: #c63a28;\\n}\\nbody .food {\\n  background-color: #4d4d4d;\\n  width: 75%;\\n  height: 75%;\\n  border-radius: 50%;\\n  border: 2px solid #4d4d4d;\\n}\\nbody #gui .credit {\\n  text-align: center;\\n  color: #fff;\\n  font-size: 9pt;\\n  text-decoration: none;\\n  margin: auto;\\n  display: block;\\n  margin-bottom: 15px;\\n}\\nbody #gui .button-grid.direction {\\n  margin-bottom: 15px;\\n}\\nbody #gui .button-grid.direction button.button.big {\\n  width: 75px;\\n  height: 65px;\\n  font-size: 12pt;\\n}\\nbody #gui .button-grid {\\n  display: flex;\\n  justify-content: center;\\n  width: 70vh;\\n  margin: 0 auto;\\n  margin-top: 5px;\\n  flex-wrap: wrap;\\n}\\n@media (max-width: 500px) {\\n  body #gui .button-grid {\\n    width: 70vw;\\n  }\\n}\\nbody #gui .button-grid:not(.direction) {\\n  margin-bottom: 20px;\\n}\\nbody #gui .button-grid button.button.big:hover {\\n  background: rgb(172, 152, 164);\\n}\\nbody #gui .button-grid button.button.big {\\n  font-size: 9pt;\\n  z-index: 10;\\n  cursor: pointer;\\n  content: \\\"\\\";\\n  display: block;\\n  min-width: 75px;\\n  width: 65px;\\n  height: 55px;\\n  font-weight: bold;\\n  text-transform: uppercase;\\n  background: #dedee0;\\n  background-image: linear-gradient(#dedee0, #aaa);\\n  border-radius: 50%;\\n  border: 2px solid rgba(0, 0, 0, 0.8);\\n  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2666666667);\\n  border-radius: 48% 52% 50% 50%/40% 40% 60% 60%;\\n  transform: translateY(var(--y, 0)) rotate(var(--rotation, 0));\\n}\\n@media (max-width: 500px) {\\n  body #gui .button-grid button.button.big {\\n    width: 30px;\\n    height: 45px;\\n  }\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://snake/./assets/styles/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 7:0-14 */
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://snake/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://snake/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./assets/styles/main.css":
/*!********************************!*\
  !*** ./assets/styles/main.css ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./assets/styles/main.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://snake/./assets/styles/main.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 75:0-14 */
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://snake/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 39:0-14 */
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://snake/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 11:0-14 */
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://snake/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 12:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://snake/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 70:0-14 */
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://snake/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 16:0-14 */
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://snake/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./assets/js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;