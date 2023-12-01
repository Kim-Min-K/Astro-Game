import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const BH_INTERVAL_MIN = 1000
const BH_INTERVAL_MAX = 10000
const worldElem = document.querySelector("[data-world]")

let time = 10000000
let nextBHTime
let bhrandom = 0
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
        bhrandom = Math.floor(Math.random() * 2)
        createBH(bhrandom)
        nextBHTime = randomNumber(BH_INTERVAL_MIN, BH_INTERVAL_MAX) / speedIncreaser
    }
    nextBHTime -= delta
}

export function getBHRects() {
    return [...document.querySelectorAll("[data-blackhole]")].map(blackhole => {
        return blackhole.getBoundingClientRect()
    })
}

function createBH(bhrandom) {
    const blackhole = document.createElement("img")
    blackhole.dataset.blackhole = true
    if (bhrandom == 1) {
        blackhole.src = "imgs/blackhole.png"
    } else {
        blackhole.src = "imgs/blackhole2.png"
    }
    sleep(time)
    blackhole.classList.add("blackhole")
    setCustomProperty(blackhole, "--left", 100)
    worldElem.append(blackhole)
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
