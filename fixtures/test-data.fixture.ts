import { test as base } from './page.fixture'
import { Billing } from '../models/billing.model'
import { faker } from '@faker-js/faker'

export interface TestDataFixture {
    orders: {
        create: () => Promise<number>
        createMany: (count: number) => Promise<number[]>
    }
    billing: {
        getRandom: () => Billing
        getBillingWithMandatoryBlank: () => Billing
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
            },
            billing: {
                getRandom: () => {
                    return new Billing(
                        faker.person.firstName(),
                        faker.person.lastName(),
                        'United States (US)',
                        faker.location.streetAddress(),
                        faker.location.city(),
                        faker.phone.number({ style: 'international' }),
                        faker.internet.email(),
                        faker.company.name(),
                        faker.location.zipCode(),
                        faker.helpers.arrayElement([
                            'Please deliver during business hours',
                            'Leave at the front door',
                            'Call upon arrival',
                            'Standard delivery is fine',
                            undefined
                        ])
                    )
                },
                getBillingWithMandatoryBlank: () => {
                    return new Billing(
                        '',
                        '',
                        'United States (US)',
                        '',
                        '',
                        '',
                        '',
                        '',
                        ''
                    )
                }
            }
        }

        await use(testData)
    }
})
