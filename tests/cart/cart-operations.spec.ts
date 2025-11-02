import { test } from "../../fixtures/page.fixture"

test("[TC_08] cart: clears all items", async ({ loggedInPage, shopPage, cartPage }) => {
    await loggedInPage.header.goToShop()
    const products = await shopPage.addRandomProductsToCart(3)
    await shopPage.header.goToCart()

    await cartPage.shouldProductsDisplayInCart(products)
    await cartPage.clearCart()
    await cartPage.shouldCartBeEmpty()
})

test("[TC_09] cart: updates quantity and subtotal", async ({ loggedInPage, shopPage, cartPage }) => {
    await loggedInPage.header.goToShop()
    const product = await shopPage.addRandomProductToCart()
    await shopPage.header.goToCart()

    await cartPage.shouldProductQuantityAndSubtotalCorrectly(product)
    await cartPage.plusProductQuantity(product)
    await cartPage.shouldProductQuantityAndSubtotalCorrectly(product)
    await cartPage.fillProductQuantity(product, 4)
    await cartPage.shouldProductQuantityAndSubtotalCorrectly(product)
    await cartPage.minusProductQuantity(product)
    await cartPage.shouldProductQuantityAndSubtotalCorrectly(product)

})