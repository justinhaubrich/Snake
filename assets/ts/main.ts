import { constants } from './constants';
import { api } from './api';
import { gui } from './gui';
import { store } from './store';
import '../styles/main.css'

Object.defineProperty(window, 'api', { value: api, writable: true })
let grid: HTMLElement = document.getElementById('grid')

logInfo()
api.initGame(grid, constants, store, gui)

function logInfo() {
    let blackBackground = [
    "font-size: 50px",
    "background-color: black",
    "color: white",
    ].join(" ;");

    let whiteBackground = [
    "font-size: 20px",
    "background-color: white",
    "color: black",
    ].join(" ;");

    console.log(
    "%cWelcome to Snake %cTo access, the api, just type `api` in the console.",
    blackBackground,
    whiteBackground
    )
    console.log("%cTry `api.start()` to start the game. Type `api.getBoardState()` to get the current board state.", whiteBackground)
}