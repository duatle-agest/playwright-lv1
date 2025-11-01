import { test } from '../../fixtures/test-data.fixture'

test("[TC_01] checkout: purchases a single item", async ({ loggedInPage, shopPage, productPage, cartPage, checkoutPage, orderStatusPage, testData }) => {
    await loggedInPage.header.selectElectronicComponents()

    await shopPage.shouldProductsDisplayAs('Grid')
    await shopPage.switchViewTo('List')
    await shopPage.shouldProductsDisplayAs('List')
    const product = await shopPage.selectRandomProduct()

    await productPage.addProductToCart()
    await productPage.shouldProductAddedSuccessfully()
    await productPage.header.goToCart()

    await cartPage.shouldProductDisplayInCart(product)
    await cartPage.proceedToCheckout()

    await checkoutPage.shouldDisplay()
    await checkoutPage.shouldProductDisplayInOrder(product)
    const billingDetails = testData.billing.getRandom()
    await checkoutPage.fillBillingDetails(billingDetails)
    await checkoutPage.placeOrder()

    await orderStatusPage.shouldDisplay()
    await orderStatusPage.shouldProductDisplayInOrder(product)
    await orderStatusPage.shouldBillingDetailsDisplayCorrectly(billingDetails)
    await orderStatusPage.shouldOrderConfirmationMessageDisplayCorrectly()
})

test("[TC_02] checkout: purchases multiple items", async ({ loggedInPage, shopPage, cartPage, checkoutPage, orderStatusPage }) => {
    await loggedInPage.header.goToShop()

    const products = await shopPage.addMultipleRandomProductsToCart(3)
    await shopPage.header.goToCart()

    await cartPage.shouldProductsDisplayInCart(products)
    await cartPage.proceedToCheckout()

    await checkoutPage.placeOrder()

    await orderStatusPage.shouldProductsDisplayInOrder(products)
    await orderStatusPage.shouldOrderConfirmationMessageDisplayCorrectly()
})