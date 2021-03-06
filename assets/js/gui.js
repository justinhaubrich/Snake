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
        start.classList.add("start");
        start.innerText = "Start";
        start.onclick = function () { api.start(); };
        button_grid.append(start);
        var pause = document.createElement('button');
        pause.classList.add("big");
        pause.classList.add("button");
        pause.classList.add("pause");
        pause.innerText = "Pause";
        pause.onclick = function () { api.pause(); };
        button_grid.append(pause);
        var restart = document.createElement('button');
        restart.classList.add("big");
        restart.classList.add("button");
        restart.classList.add("restart");
        restart.innerText = "Restart";
        restart.onclick = function () { api.restart(); };
        button_grid.append(restart);
        var large = document.createElement('button');
        large.classList.add("big");
        large.classList.add("button");
        large.innerText = "Tiny";
        large.onclick = function () { api.setBoardSize(21); };
        button_grid.append(large);
        var medium = document.createElement('button');
        medium.classList.add("big");
        medium.classList.add("button");
        medium.innerText = "Small";
        medium.onclick = function () { api.setBoardSize(15); };
        button_grid.append(medium);
        var small = document.createElement('button');
        small.classList.add("big");
        small.classList.add("button");
        small.innerText = "Huge";
        small.onclick = function () { api.setBoardSize(7); };
        button_grid.append(small);
        button_grid.append(this.createButton("Easy", "big button", function () { api.setDifficulty('easy'); }));
        button_grid.append(this.createButton("Medium", "big button", function () { api.setDifficulty('medium'); }));
        button_grid.append(this.createButton("Hard", "big button", function () { api.setDifficulty('hard'); }));
        dir_grid.append(this.createButton("\u21E6", "big button", function () { api.changeDirection('LEFT'); }));
        // put up and down in their on flex grid
        var updown = document.createElement('div');
        updown.classList.add("updown-buttons");
        dir_grid.append(updown);
        updown.append(this.createButton("\u21E7", "big button", function () { api.changeDirection('UP'); }));
        updown.append(this.createButton("\u21E9", "big button", function () { api.changeDirection('DOWN'); }));
        dir_grid.append(this.createButton("\u21E8", "big button", function () { api.changeDirection('RIGHT'); }));
        var credit = document.createElement('a');
        credit.href = "https://jhaubrich.com";
        credit.innerText = "Snake by Justin Haubrich, 2022";
        credit.target = "_blank";
        credit.classList.add("credit");
        document.body.append(credit);
    }
};
