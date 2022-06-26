"use strict";
exports.__esModule = true;
exports.gui = void 0;
exports.gui = {
    setup: function (api) {
        console.log("setting up gui");
        var gui = document.querySelector('#gui');
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
        var resume = document.createElement('button');
        resume.classList.add("big");
        resume.classList.add("button");
        resume.innerText = "Resume";
        resume.onclick = function () { api.start(); };
        button_grid.append(resume);
    }
};
