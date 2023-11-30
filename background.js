import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const skyElems = document.querySelectorAll("[data-sky]")

export function setupSky() {
    setCustomProperty(skyElemsElems[0], "--left", 0)
    setCustomProperty(skyElems[1], "--left", 300)
}

export function updateSky(delta, speedScale) {
    skyElems.forEach(sky => {
        incrementCustomProperty(sky, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(sky, "--left") <= -300) {
            incrementCustomProperty(sky, "--left", 600)
        }
    })
}
