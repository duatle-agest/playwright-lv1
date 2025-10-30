import { test } from '../../fixtures/auth.fixture'

test.describe('Order History', () => {

    test.beforeEach(async ({ loggedInPage }) => {
        await loggedInPage.header.goToShop()
    })

    test("[TC_05] orders: shows completed orders in history", async ({ }) => {
        // TODO
    })
})