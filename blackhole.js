import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const BH_INTERVAL_MIN = 500
const BH_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextBHTime
export function setupBlackHole() {
    nextBHTime = BH_INTERVAL_MIN
    document.querySelectorAll("[data-blackhole]").forEach(blackhole => {
        blackhole.remove()
    })
}

export function updateBlackHole(delta, speedIncreaser) {
    document.querySelectorAll("[data-blackhole]").forEach(blackhole => {
        incrementCustomProperty(blackhole, "--left", delta * speedIncreaser * SPEED * -1)
        if (getCustomProperty(blackhole, "--left") <= -100) {
            blackhole.remove()
        }
    })

    if (nextBHTime <= 0) {
        createBH()
        nextBHTime = randomNumber(BH_INTERVAL_MIN, BH_INTERVAL_MAX) / speedIncreaser
    }
    nextBHTime -= delta
}

export function getBHRects() {
    return [...document.querySelectorAll("[data-blackhole]")].map(blackhole => {
        return blackhole.getBoundingClientRect()
    })
}

function createBH() {
    const blackhole = document.createElement("img")
    blackhole.dataset.blackhole = true
    blackhole.src = "imgs/blackhole.png"
    blackhole.classList.add("blackhole")
    setCustomProperty(blackhole, "--left", 100)
    worldElem.append(blackhole)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
