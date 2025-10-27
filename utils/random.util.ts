import { Locator } from '@playwright/test'

/**
 * Gets multiple random locators from a group of locators
 * @param locator The parent locator that contains multiple elements
 * @param numberOfItems The number of random locators to retrieve
 * @returns An array of Locators representing random elements from the group
 */
const getRandomMultipleLocators = async (locator: Locator, numberOfItems: number): Promise<Locator[]> => {
    const count = await locator.count()
    if (count <= 0) {
        throw new Error('No elements found in the locator')
    }
    if (numberOfItems > count) {
        throw new Error('Requested more items than available')
    }

    const randomLocators: Locator[] = []
    const usedIndices = new Set<number>()

    while (randomLocators.length < numberOfItems) {
        const randomIndex = await getRandomIndex(count)
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex)
            randomLocators.push(locator.nth(randomIndex))
        }
    }

    return randomLocators
}

/**
 * Gets a random locator from a group of locators
 * @param locator The parent locator that contains multiple elements
 * @returns A Locator representing a random element from the group
 */
const getRandomLocator = async (locator: Locator): Promise<Locator> => {
    const [randomLocator] = await getRandomMultipleLocators(locator, 1)
    return randomLocator
}

/**
 * Gets a random index within the range of 0 to max - 1
 * @param max The exclusive upper bound for the random index
 * @returns A random index number
 */
const getRandomIndex = async (max: number): Promise<number> => {
    if (max <= 0) {
        throw new Error('Max must be greater than 0')
    }
    return Math.floor(Math.random() * max)
}

export { getRandomLocator, getRandomMultipleLocators, getRandomIndex }
