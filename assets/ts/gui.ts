export const gui = {
    createButton(text: string, className: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement('button')
        button.innerText = text
        button.className = className
        button.onclick = onClick
        return button
    }
    setup(api) {
        // TODO: refactor for DRY
        console.log(`setting up gui`)
        const gui = document.querySelector('#gui')

        const dir_grid = document.createElement('div')
        dir_grid.classList.add(`button-grid`)
        dir_grid.classList.add(`direction`)
        gui.append(dir_grid)

        const button_grid = document.createElement('div')
        button_grid.classList.add(`button-grid`)
        gui.append(button_grid)

        const start= document.createElement('button')
        start.classList.add(`big`)
        start.classList.add(`button`)
        start.innerText = `Start`
        start.onclick = () => { api.start() }
        button_grid.append(start)

        const restart= document.createElement('button')
        restart.classList.add(`big`)
        restart.classList.add(`button`)
        restart.innerText = `Restart`
        restart.onclick = () => { api.restart() }
        button_grid.append(restart)

        const pause= document.createElement('button')
        pause.classList.add(`big`)
        pause.classList.add(`button`)
        pause.innerText = `Pause`
        pause.onclick = () => { api.pause() }
        button_grid.append(pause)

        const large = document.createElement('button')
        large.classList.add(`big`)
        large.classList.add(`button`)
        large.innerText = `Small`
        large.onclick = () => { api.setBoardSize(21) }
        button_grid.append(large)

        const medium = document.createElement('button')
        medium.classList.add(`big`)
        medium.classList.add(`button`)
        medium.innerText = `Medium`
        medium.onclick = () => { api.setBoardSize(15) }
        button_grid.append(medium)

        const small = document.createElement('button')
        small.classList.add(`big`)
        small.classList.add(`button`)
        small.innerText = `Big`
        small.onclick = () => { api.setBoardSize(7) }
        button_grid.append(small)

        button_grid.append(this.createButton(`Easy`, `big button`, () => { api.setDifficulty('easy') }))
        button_grid.append(this.createButton(`Medium`, `big button`, () => { api.setDifficulty('medium') }))
        button_grid.append(this.createButton(`Hard`, `big button`, () => { api.setDifficulty('hard') }))



        dir_grid.append(this.createButton(`left`, `big button`, () => { api.changeDirection('LEFT') }))
        dir_grid.append(this.createButton(`right`, `big button`, () => { api.changeDirection('RIGHT') }))
        dir_grid.append(this.createButton(`up`, `big button`, () => { api.changeDirection('UP') }))
        dir_grid.append(this.createButton(`down`, `big button`, () => { api.changeDirection('DOWN') }))
    }
}