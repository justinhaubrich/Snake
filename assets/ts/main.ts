import { constants } from './constants';
import { api } from './api';
import { gui } from './gui';
import { store } from './store';
import '../styles/main.css'

Object.defineProperty(window, 'api', { value: api, writable: true })
let grid: HTMLElement = document.getElementById('grid')

api.initGame(grid, constants, store, gui)