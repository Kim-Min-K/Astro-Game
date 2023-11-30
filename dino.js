import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = .0012
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100


let isJumping
let dinoFrame
let currentFrameTime
let yVeloctiy
export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVeloctiy = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)

}

export function updateDino(delta, speedIncreaser) {
    handleRUN(delta, speedIncreaser)
    handleJump(delta)

}
function handleRUN(delta, speedIncreaser) {
    if (isJumping) {
        dinoElem.src = `imgs/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedIncreaser
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVeloctiy * delta)

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVeloctiy -= GRAVITY * delta

}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return
    yVeloctiy = JUMP_SPEED
    isJumping = true
}