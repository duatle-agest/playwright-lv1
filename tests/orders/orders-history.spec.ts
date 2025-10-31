import { test } from '../../fixtures/test-data.fixture'

test("[TC_05] orders: shows completed orders in history", async ({ myAccountPage, testData }) => {
    const orderNumbers = await testData.orders.createMany(2)

    await myAccountPage.header.goToMyAccount()
    await myAccountPage.goToOrders()
    await myAccountPage.shouldOrdersDisplay(orderNumbers)
})