import { test } from "../../fixtures/test-data.fixture"


test("[TC_06] checkout: completes purchase as guest", async ({ homePage, shopPage, cartPage, checkoutPage, orderStatusPage, testData }) => {
    await homePage.header.goToShop()

    const product = await shopPage.addRandomProductToCart()
    await shopPage.header.goToCart()

    await cartPage.proceedToCheckout()

    const billing = testData.billing.getRandom()
    await checkoutPage.fillBillingDetails(billing)
    await checkoutPage.placeOrder()

    await orderStatusPage.shouldOrderConfirmationMessageDisplayCorrectly()
    await orderStatusPage.shouldProductDisplayInOrder(product)
    await orderStatusPage.shouldBillingDetailsDisplayCorrectly(billing)
})

test("[TC_07] checkout: validates required fields and errors", async ({ loggedInPage, shopPage, checkoutPage, testData }) => {
    await loggedInPage.header.goToShop()
    await shopPage.addRandomProductToCart()
    await shopPage.header.goToCheckout()

    const billingWithMandatoryBlank = testData.billing.getBillingWithMandatoryBlank()
    await checkoutPage.fillBillingDetails(billingWithMandatoryBlank)
    await checkoutPage.placeOrder()

    await checkoutPage.shouldValidationShowRequiredFieldsErrors(billingWithMandatoryBlank)
    await checkoutPage.shouldValidationHighlightRequiredFields(billingWithMandatoryBlank)

})