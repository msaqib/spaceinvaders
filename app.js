const cvs = document.getElementById('canvas')

const width = 310
const height = 300

const rows = 30
const columns = 31

let aliens = []
let aliensInterval = null
let direction = 1

let playerLocation = Math.floor(columns / 2) + columns * (rows - 2)
document.addEventListener('keydown', movePlayer)

setup()

const blocks = document.querySelectorAll('#canvas div')

drawInterval = setInterval(draw, 50)
aliensMoveInterval = setInterval(moveAliens, 100)

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

function renderAliens() {
    aliens.forEach(a => blocks[a].classList.add('alien'))
}

function draw() {
    renderAliens()
    removePlayer()
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
                if(laserIndex < 0) {
                    clearInterval(laserId)
                }
                else if (blocks[laserIndex].classList.contains('alien')) {
                    clearInterval(laserId)
                    aliens = aliens.filter(a => a !== laserIndex)
                }
                else {
                    showLaser(laserIndex)
                }
            }
            let laserId = setInterval(moveLaser, 500)            
            break
    }
}

function moveAliens() {
    removeAliens()
    aliens = aliens.map(alien => alien + direction)
    const right = aliens.some(a => a % columns === columns - 1)
    const left = aliens.some(a => a % columns === 0)
    if (left) {
        direction = 1
        aliens = aliens.map(a => a + columns)
    }
    if (right){
        direction = -1
        aliens = aliens.map(a => a + columns )
    }
    if (Math.floor(aliens[aliens.length - 1] / columns) === (rows - 2) ) {
        document.removeEventListener('keydown', movePlayer)
        clearInterval(aliensInterval)
        clearInterval(drawInterval)
        clearInterval(aliensMoveInterval)
    }    
    
}

function showLaser(laserIndex) {
    if (laserIndex) blocks[laserIndex].classList.add('laser')
}