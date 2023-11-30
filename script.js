import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino } from './dino.js'
import { updateBlackHole, setupBlackHole } from './blackhole.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_INCREASER = 0.0001


const worldElem = document.querySelector('[data-world]')
const distanceScoreElem = document.querySelector('[data-distance-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

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

    lastTime = time
    window.requestAnimationFrame(update)
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

