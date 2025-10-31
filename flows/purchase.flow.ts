import { PaymentMethod } from "../data/enum.data";
import { CheckoutPage } from "../pages/checkout.page";
import { OrderStatusPage } from "../pages/order-status.page";
import { ShopPage } from "../pages/shop.page";

export class PurchaseFlow {
    private shopPage: ShopPage
    private checkoutPage: CheckoutPage
    private orderStatusPage: OrderStatusPage

    constructor(shopPage: ShopPage, checkoutPage: CheckoutPage, orderStatusPage: OrderStatusPage) {
        this.shopPage = shopPage
        this.checkoutPage = checkoutPage
        this.orderStatusPage = orderStatusPage
    }

    async checkoutByPaymentMethod(paymentMethod: PaymentMethod): Promise<void> {
        await this.shopPage.header.goToShop()
        await this.shopPage.addRandomProductToCart()
        await this.shopPage.header.goToCheckout()
        await this.checkoutPage.selectPaymentMethod(paymentMethod)
        await this.checkoutPage.placeOrder()
        await this.orderStatusPage.waitForOrderStatus()
        await this.orderStatusPage.shouldPaymentMethodDisplayCorrectly(paymentMethod)
    }

    async placeOrder(): Promise<number> {
        await this.shopPage.header.goToShop()
        await this.shopPage.addRandomProductToCart()
        await this.shopPage.header.goToCheckout()
        await this.checkoutPage.placeOrder()
        await this.orderStatusPage.waitForOrderStatus()
        await this.orderStatusPage.shouldOrderConfirmationMessageDisplayCorrectly()
        return await this.orderStatusPage.getOrderNumber()
    }
}