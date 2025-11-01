import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import { Product } from "../models/product.model"
import { Billing } from "../models/billing.model"
import { PaymentMethod } from "../data/enum.data"

export class OrderStatusPage extends BasePage {
    readonly billingDetailsSection: Locator
    readonly orderConfirmationMessage: Locator
    readonly orderNumberLabel: Locator

    constructor(page: Page) {
        super(page)
        this.billingDetailsSection = page.getByRole('generic').filter({ has: page.getByRole('heading', { name: 'Billing Address' }) })
        this.orderConfirmationMessage = page.getByText('Thank you. Your order has been received.')
        this.orderNumberLabel = page.getByRole('listitem').filter({ hasText: 'Order number: ' }).getByRole('strong')
    }

    async shouldDisplay(): Promise<void> {
        await expect(this.page).toHaveURL(/\/order-received/i)
    }

    async waitForOrderStatus(): Promise<void> {
        await this.page.waitForURL(/\/order-received/i, { timeout: 20000 })
    }

    async shouldProductDisplayInOrder(product: Product): Promise<void> {
        await expect(this.page.getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ hasText: product.getName() })
            })
            .getByRole('cell', { name: product.getPrice() }).nth(0)
        ).toBeVisible()
    }

    async shouldProductsDisplayInOrder(products: Product[]): Promise<void> {
        for (const product of products) {
            await this.shouldProductDisplayInOrder(product)
        }
    }

    async shouldBillingDetailsDisplayCorrectly(expectedBilling: Billing): Promise<void> {
        expect(this.page.getByText(expectedBilling.firstName + " " + expectedBilling.lastName).first()).toBeVisible()
        expect(this.page.getByText(expectedBilling.streetAddress).first()).toBeVisible()
        expect(this.page.getByText(expectedBilling.city).first()).toBeVisible()
        expect(this.page.getByText(expectedBilling.phone).first()).toBeVisible()
        expect(this.page.getByText(expectedBilling.email).first()).toBeVisible()
        if (expectedBilling.companyName) expect(this.page.getByText(expectedBilling.companyName).first()).toBeVisible()
        if (expectedBilling.orderNotes) expect(this.page.getByText(expectedBilling.orderNotes).first()).toBeVisible()
    }

    async shouldOrderConfirmationMessageDisplayCorrectly(): Promise<void> {
        await expect(this.orderConfirmationMessage).toBeVisible()
    }

    async shouldPaymentMethodDisplayCorrectly(paymentMethod: PaymentMethod): Promise<void> {
        await expect(this.page.getByRole('list').getByText(paymentMethod)).toBeVisible()
        await expect(this.page.getByRole('table').getByText(paymentMethod)).toBeVisible()
    }

    async getOrderNumber(): Promise<number> {
        const orderNumberText = await this.orderNumberLabel.innerText()
        if (!orderNumberText) throw new Error('Order number not found')
        return parseInt(orderNumberText)
    }
}