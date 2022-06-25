"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var api_1 = require("./api");
require("../styles/main.css");
var grid = document.getElementById('grid');
console.log(constants_1.constants, 1, grid, api_1.api);
api_1.api.initGame(grid, constants_1.constants);
