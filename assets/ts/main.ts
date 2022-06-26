import { constants } from './constants';
import { api } from './api';
import { gui } from './gui';
import { store } from './store';
import '../styles/main.css'

Object.defineProperty(window, 'api', { value: api, writable: true })
let grid: HTMLElement = document.getElementById('grid')
console.log(constants, 1, grid, api)

api.initGame(grid, constants, store, gui)