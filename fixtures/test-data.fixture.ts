import { test as base } from './page.fixture'

export interface TestDataFixture {
    orders: {
        create: () => Promise<number>;
        createMany: (count: number) => Promise<number[]>;
    }
}

export const test = base.extend<{ testData: TestDataFixture }>({
    testData: async ({ loggedInPage, purchaseFlow }, use) => {
        const testData: TestDataFixture = {
            orders: {
                create: async () => {
                    await loggedInPage.header.goToShop()
                    return await purchaseFlow.placeOrder()
                },
                createMany: async (count: number) => {
                    await loggedInPage.header.goToShop()
                    const orderNumbers: number[] = []
                    for (let i = 0; i < count; i++) {
                        orderNumbers.push(await purchaseFlow.placeOrder())
                    }
                    return orderNumbers
                }
            }
        }

        await use(testData)
    }
})
