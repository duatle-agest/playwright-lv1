import { test as base } from '@playwright/test'
import { MyAccountPage } from '../pages/my-account.page'
import { HomePage } from '../pages/home.page'
import { ShopPage } from '../pages/shop.page'
import { Account } from '../models/account.model'
import { ProductPage } from '../pages/product.page'
import { CartPage } from '../pages/cart.page'
import { CheckoutPage } from '../pages/checkout.page'
import { OrderStatusPage } from '../pages/order-status.page'

type Fixtures = {
    loggedInPage: MyAccountPage
    myAccountPage: MyAccountPage
    homePage: HomePage
    shopPage: ShopPage
    productPage: ProductPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
    orderStatusPage: OrderStatusPage
}

const USERNAME = process.env.USERNAME!
const PASSWORD = process.env.PASSWORD!

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page, baseURL }, use) => {
        await page.goto(`${baseURL}/my-account`)
        const myAccountPage = new MyAccountPage(page)
        const account = new Account(USERNAME, PASSWORD)
        await myAccountPage.login(account)
        await myAccountPage.header.removeAllProductsFromCart()
        await use(myAccountPage)
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await homePage.closeButton.click()
        await use(homePage)
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page))
    },
    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page))
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },
    orderStatusPage: async ({ page }, use) => {
        await use(new OrderStatusPage(page))
    }
})
