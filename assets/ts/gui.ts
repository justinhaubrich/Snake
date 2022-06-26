export const gui = {
    setup(api) {
        console.log(`setting up gui`)
        let gui = document.querySelector('#gui')
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

        const resume= document.createElement('button')
        resume.classList.add(`big`)
        resume.classList.add(`button`)
        resume.innerText = `Resume`
        resume.onclick = () => { api.start() }
        button_grid.append(resume)


    }
}