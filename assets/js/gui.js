"use strict";
exports.__esModule = true;
exports.gui = void 0;
exports.gui = {
    createButton: function (text, className, onClick) {
        var button = document.createElement('button');
        button.innerText = text;
        button.className = className;
        button.onclick = onClick;
        return button;
    },
    setup: function (api) {
        // TODO: refactor for DRY
        console.log("setting up gui");
        var gui = document.querySelector('#gui');
        var dir_grid = document.createElement('div');
        dir_grid.classList.add("button-grid");
        dir_grid.classList.add("direction");
        gui.append(dir_grid);
        var button_grid = document.createElement('div');
        button_grid.classList.add("button-grid");
        gui.append(button_grid);
        var start = document.createElement('button');
        start.classList.add("big");
        start.classList.add("button");
        start.innerText = "Start";
        start.onclick = function () { api.start(); };
        button_grid.append(start);
        var restart = document.createElement('button');
        restart.classList.add("big");
        restart.classList.add("button");
        restart.innerText = "Restart";
        restart.onclick = function () { api.restart(); };
        button_grid.append(restart);
        var pause = document.createElement('button');
        pause.classList.add("big");
        pause.classList.add("button");
        pause.innerText = "Pause";
        pause.onclick = function () { api.pause(); };
        button_grid.append(pause);
        var large = document.createElement('button');
        large.classList.add("big");
        large.classList.add("button");
        large.innerText = "Small";
        large.onclick = function () { api.setBoardSize(21); };
        button_grid.append(large);
        var medium = document.createElement('button');
        medium.classList.add("big");
        medium.classList.add("button");
        medium.innerText = "Medium";
        medium.onclick = function () { api.setBoardSize(15); };
        button_grid.append(medium);
        var small = document.createElement('button');
        small.classList.add("big");
        small.classList.add("button");
        small.innerText = "Big";
        small.onclick = function () { api.setBoardSize(7); };
        button_grid.append(small);
        button_grid.append(this.createButton("Easy", "big button", function () { api.setDifficulty('easy'); }));
        button_grid.append(this.createButton("Medium", "big button", function () { api.setDifficulty('medium'); }));
        button_grid.append(this.createButton("Hard", "big button", function () { api.setDifficulty('hard'); }));
        dir_grid.append(this.createButton("left", "big button", function () { api.changeDirection('LEFT'); }));
        dir_grid.append(this.createButton("right", "big button", function () { api.changeDirection('RIGHT'); }));
        dir_grid.append(this.createButton("up", "big button", function () { api.changeDirection('UP'); }));
        dir_grid.append(this.createButton("down", "big button", function () { api.changeDirection('DOWN'); }));
    }
};