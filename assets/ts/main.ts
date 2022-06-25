import { constants } from './constants';
import { api } from './api';
import '../styles/main.css'

let grid: HTMLElement = document.getElementById('grid')
console.log(constants, 1, grid, api)

api.initGame(grid, constants)