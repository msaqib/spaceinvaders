const cvs = document.getElementById('canvas')

const width = 300
const height = 300

const rows = 30
const columns = 31

let aliens = []
let aliensInterval = null

let playerLocation = Math.floor(columns / 2) + columns * (rows - 2)
document.addEventListener('keydown', movePlayer)

setup()

const blocks = document.querySelectorAll('#canvas div')

aliensInterval = setInterval(draw, 500)

function setup() {
    for(let i = 0 ; i < rows ; i++) {
        for (let j = 0 ; j < columns ; j++) {
            const dv = document.createElement('div')
            cvs.appendChild(dv)
        }
    }
    alienInitialLocations()
}

function alienInitialLocations() {
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 10 ; j++) {
            aliens.push(i*columns + j) 
        }
    }
}

function draw() {
    removeAliens()
    removePlayer()
    aliens.forEach( a => {
        blocks[a].classList.add('alien')
    })
    blocks[playerLocation].classList.add('player')
}

function removePlayer() {
    blocks[playerLocation].classList.remove('player')
}

function removeLaser(laserIndex) {
    if (laserIndex) blocks[laserIndex].classList.remove('laser')   
}

function removeAliens() {
    aliens.forEach(a => {
        blocks[a].classList.remove('alien')
    })
}

function movePlayer(evnt) {
    const key = evnt.key
    removePlayer()
    switch (key) {
        case 'ArrowLeft':
            if (playerLocation % columns) {
                playerLocation--
            }
            break
        case 'ArrowRight':
            if (playerLocation % columns !== columns - 1) {
                playerLocation++
            }
            break
        case ' ':
            let laserIndex = playerLocation - columns
            function moveLaser() {
                removeLaser(laserIndex)   
                laserIndex -= columns
                showLaser(laserIndex)
            
            }
            let laserId = setInterval(moveLaser, 500)            
            break
    }
    draw()
}

function moveAliens() {

}

function showLaser(laserIndex) {
    if (laserIndex) blocks[laserIndex].classList.add('laser')
}