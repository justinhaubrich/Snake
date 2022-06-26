"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var api_1 = require("./api");
var gui_1 = require("./gui");
var store_1 = require("./store");
require("../styles/main.css");
Object.defineProperty(window, 'api', { value: api_1.api, writable: true });
var grid = document.getElementById('grid');
logInfo();
api_1.api.initGame(grid, constants_1.constants, store_1.store, gui_1.gui);
function logInfo() {
    var blackBackground = [
        "font-size: 50px",
        "background-color: black",
        "color: white",
    ].join(" ;");
    var whiteBackground = [
        "font-size: 20px",
        "background-color: white",
        "color: black",
    ].join(" ;");
    console.log("%cWelcome to Snake %cTo access, the api, just type `api` in the console.", blackBackground, whiteBackground);
    console.log("%cTry `api.start()` to start the game. Type `api.getBoardState()` to get the current board state.", whiteBackground);
}
