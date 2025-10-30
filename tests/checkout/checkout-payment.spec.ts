import { PaymentMethod } from '../../data/enum.data'
import { test } from '../../fixtures/page.fixture'

const paymentMethods = [
    PaymentMethod.BANK_TRANSFER,
    PaymentMethod.CHECK_PAYMENT,
    PaymentMethod.CASH_ON_DELIVERY
]

for (const paymentMethod of paymentMethods) {
    test(`[TC_03] checkout: pays with ${paymentMethod} successfully`, async ({ loggedInPage, purchaseFlow }) => {
        await loggedInPage.header.goToShop()
        await purchaseFlow.checkoutByPaymentMethod(paymentMethod)
    })
}