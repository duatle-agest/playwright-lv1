import { test, expect } from '../../fixtures/auth.fixture'
import { HomePage } from '../../pages/home-page'
import { ProductCategoryPage } from '../../pages/product-category-page'
import { ProductPage } from '../../pages/product-page'
import { CartPage } from '../../pages/cart-page'
import { CheckoutPage } from '../../pages/checkout-page'
import { Billing } from '../../models/billing'
import { OrderStatusPage } from '../../pages/order-status-page'

const billing = new Billing({
    companyName: 'Acme Corp',
    streetAddress: '123 Main St',
    zipCode: '12345',
    orderNotes: 'Please deliver between 9am and 5pm.'
})

test("[TC_01] checkout: purchases a single item", async ({ authPage }) => {
    const homePage = new HomePage(authPage)
    const productCategoryPage = new ProductCategoryPage(authPage)
    const productPage = new ProductPage(authPage)
    const cartPage = new CartPage(authPage)
    const checkoutPage = new CheckoutPage(authPage)
    const orderStatusPage = new OrderStatusPage(authPage)

    await homePage.closeButton.click()
    await homePage.header.allDepartmentsLink.click()
    await homePage.header.electronicComponentsLink.click()
    expect(productCategoryPage.isGridView()).toBeTruthy()

    await productCategoryPage.switchListViewLink.click()
    expect(productCategoryPage.isListView()).toBeTruthy()

    const product = await productCategoryPage.selectRandomProduct()

    await productPage.addToCartButton.click()
    await productPage.header.cartLink.click()

    expect(await cartPage.isProductInCart(product)).toBeTruthy()

    await cartPage.checkoutButton.click()

    await expect(authPage).toHaveTitle(/^Checkout/i)

    expect(await checkoutPage.isProductInOrder(product)).toBeTruthy()

    await checkoutPage.fillBillingDetails(billing)
    const fullBilling = await checkoutPage.getFullBilling()
    await checkoutPage.placeOrderButton.click()

    await expect(authPage).toHaveURL(/\/order-received/i)

    expect(await orderStatusPage.isProductInOrder(product)).toBeTruthy()
    expect(await orderStatusPage.assertBillingDetails(fullBilling))

    expect(orderStatusPage.orderConfirmationMessage).toBeVisible()
})

test("[TC_02] checkout: purchases multiple items", async ({ authPage }) => {
    // TODO
})