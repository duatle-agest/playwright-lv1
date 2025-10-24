import { Locator } from '@playwright/test'

/**
 * Gets a random locator from a group of locators
 * @param locator The parent locator that contains multiple elements
 * @returns A Locator representing a random element from the group
 */
async function getRandomLocator(locator: Locator): Promise<Locator> {
    const count = await locator.count()
    if (count <= 0) {
        throw new Error('No elements found in the locator')
    }
    const randomIndex = Math.floor(Math.random() * count)
    return locator.nth(randomIndex)
}

/**
 * Gets a random index within the range of 0 to max - 1
 * @param max The exclusive upper bound for the random index
 * @returns A random index number
 */
async function getRandomIndex(max: number): Promise<number> {
    if (max <= 0) {
        throw new Error('Max must be greater than 0')
    }
    return Math.floor(Math.random() * max)
}

export { getRandomLocator, getRandomIndex }
