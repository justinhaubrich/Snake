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
        start.classList.add(`start`)
        start.innerText = `Start`
        start.onclick = () => { api.start() }
        button_grid.append(start)

        const pause= document.createElement('button')
        pause.classList.add(`big`)
        pause.classList.add(`button`)
        pause.innerText = `Pause`
        pause.onclick = () => { api.pause() }
        button_grid.append(pause)

        const restart= document.createElement('button')
        restart.classList.add(`big`)
        restart.classList.add(`button`)
        restart.innerText = `Restart`
        restart.onclick = () => { api.restart() }
        button_grid.append(restart)

        const large = document.createElement('button')
        large.classList.add(`big`)
        large.classList.add(`button`)
        large.innerText = `Tiny`
        large.onclick = () => { api.setBoardSize(21) }
        button_grid.append(large)

        const medium = document.createElement('button')
        medium.classList.add(`big`)
        medium.classList.add(`button`)
        medium.innerText = `Small`
        medium.onclick = () => { api.setBoardSize(15) }
        button_grid.append(medium)

        const small = document.createElement('button')
        small.classList.add(`big`)
        small.classList.add(`button`)
        small.innerText = `Huge`
        small.onclick = () => { api.setBoardSize(7) }
        button_grid.append(small)

        button_grid.append(this.createButton(`Easy`, `big button`, () => { api.setDifficulty('easy') }))
        button_grid.append(this.createButton(`Medium`, `big button`, () => { api.setDifficulty('medium') }))
        button_grid.append(this.createButton(`Hard`, `big button`, () => { api.setDifficulty('hard') }))



        dir_grid.append(this.createButton(`\u21E6`, `big button`, () => { api.changeDirection('LEFT') }))
        // put up and down in their on flex grid
        const updown = document.createElement('div')
        updown.classList.add(`updown-buttons`)
        dir_grid.append(updown)
        updown.append(this.createButton(`\u21E7`, `big button`, () => { api.changeDirection('UP') }))
        updown.append(this.createButton(`\u21E9`, `big button`, () => { api.changeDirection('DOWN') }))
        dir_grid.append(this.createButton(`\u21E8`, `big button`, () => { api.changeDirection('RIGHT') }))

        const credit = document.createElement('a')
        credit.href = `https://jhaubrich.com`
        credit.innerText = `Snake by Justin Haubrich, 2022`
        credit.target = `_blank`
        credit.classList.add(`credit`)
        document.body.append(credit)
    }
}