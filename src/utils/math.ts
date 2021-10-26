/**
 * random number within range including decimals.
 * @param min minimum number inclusive
 * @param max maximum number exclusive
 */
export function randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export function randomIntRange(min: number, max: number) {
    return Math.floor(randomRange(min, max))
}

export function nearestNumberIndex(origin: number, numbers: number[]) {
    if(numbers.length === 0)
        throw new Error("Passed in numbers is empty")

    let nearestIndex = 0
    for(let i = 0; i < numbers.length; i++) {
        const currentDiff = Math.abs(numbers[i] - origin)
        const nearestDiff = Math.abs(numbers[nearestIndex] - origin)
        if (currentDiff < nearestDiff)
            nearestIndex = i
    }

    return nearestIndex
}

export function nearestNumber(origin: number, numbers: number[]) {
    return numbers[nearestNumberIndex(origin, numbers)]
}

export function roundTwoDec(num: number) {
    return Math.round(num * 100) / 100
}

export function round(value: number, step: number) {
    step || (step = 1.0)
    const inv = 1.0 / step
    return Math.round(value * inv) / inv
}


