import { test } from '../../fixtures/page.fixture'
import { Billing } from '../../models/billing.model'

const billing = new Billing({
    companyName: 'Acme Corp',
    streetAddress: '123 Main St',
    zipCode: '12345',
    orderNotes: 'Please deliver between 9am and 5pm.'
})

test("[TC_01] checkout: purchases a single item", async ({ loggedInPage, productCategoryPage, productPage, cartPage, checkoutPage, orderStatusPage }) => {
    await loggedInPage.header.selectElectronicComponents()

    await productCategoryPage.shouldProductsDisplayAs('Grid')
    await productCategoryPage.switchViewTo('List')
    await productCategoryPage.shouldProductsDisplayAs('List')
    const product = await productCategoryPage.selectRandomProduct()

    await productPage.addProductToCart()
    await productPage.header.goToCart()

    await cartPage.shouldProductDisplayInCart(product)
    await cartPage.proceedToCheckout()

    await checkoutPage.shouldDisplay()
    await checkoutPage.shouldProductDisplayInOrder(product)
    await checkoutPage.fillBillingDetails(billing)
    const fullBilling = await checkoutPage.getFullBilling()
    await checkoutPage.placeOrder()

    await orderStatusPage.shouldDisplay()
    await orderStatusPage.shouldProductDisplayInOrder(product)
    await orderStatusPage.shouldBillingDetailsDisplayCorrectly(fullBilling)
    await orderStatusPage.shouldOrderConfirmationMessageDisplayCorrectly()
})

test("[TC_02] checkout: purchases multiple items", async ({ }) => {
    // TODO
})