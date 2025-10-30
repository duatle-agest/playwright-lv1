/**
 * Generate a random integer between min and max (inclusive)
 * @param min The minimum value
 * @param max The maximum value
 * @returns A random integer between min and max
 */
const randomInt = (min: number, max: number): number => {
    if (min > max) {
        throw new Error('Min value must be less than or equal to max value')
    }
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Get random items from a list
 * @param numberOfItems Number of items to get
 * @param list The source list
 * @returns Array of random items from the list
 */
const randomItemsInList = <T>(numberOfItems: number, list: T[] | unknown): T[] => {
    if (!list || !Array.isArray(list)) {
        throw new Error('List must be an array')
    }
    if (numberOfItems > list.length) {
        throw new Error('Cannot get more items than available in the list')
    }
    if (numberOfItems <= 0) {
        throw new Error('Number of items must be greater than 0')
    }

    const result: T[] = []
    const usedIndices = new Set<number>()

    while (result.length < numberOfItems) {
        const randomIndex = randomInt(0, list.length - 1)
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex)
            result.push(list[randomIndex])
        }
    }

    return result
}

export {
    randomInt,
    randomItemsInList
}
