import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js'
import { updateBlackHole, setupBlackHole, getBHRects } from './blackhole.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_INCREASER = 0.0001


const worldElem = document.querySelector('[data-world]')
const distanceScoreElem = document.querySelector('[data-distance-score]')
const startScreenElem = document.querySelector('[data-start-screen]')
const startScreenElem2 = document.querySelector('[data-start-screen2]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedIncreaser
let score

function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedIncreaser)
    updateDino(delta, speedIncreaser)
    updateBlackHole(delta, speedIncreaser)
    updateSpeedIncreaser(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getBHRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updateSpeedIncreaser(delta) {
    speedIncreaser += delta * SPEED_INCREASER
}
function handleStart() {
    lastTime = null
    speedIncreaser = 1
    score = 0
    setupGround()
    setupDino()
    setupBlackHole()
    startScreenElem.classList.add("hide")
    startScreenElem2.classList.add("hide")
    window.requestAnimationFrame(update)
}

function updateScore(delta) {
    score += delta * .01
    distanceScoreElem.textContent = Math.floor(score)

}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide")
    }, 100)
}
